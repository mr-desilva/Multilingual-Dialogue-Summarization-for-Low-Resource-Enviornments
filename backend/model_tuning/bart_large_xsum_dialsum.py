import transformers
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, Seq2SeqTrainingArguments, Seq2SeqTrainer
from datasets import load_dataset, load_from_disk
import numpy as np
import nltk

nltk.download('punkt')

# Hyper Parameters for modal tuning
max_input = 512
max_target = 128
batch_size = 3
model_checkpoints = "facebook/bart-large-xsum"
train_dataset = load_dataset("csv", data_files="../datasets/tweetsum_train.csv")["train"]
eval_dataset = load_dataset("csv", data_files="../datasets/tweetsum_test.csv")["train"]

# Tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_checkpoints)


# Processing dialogues with input_ids, attention_mask and labels
def preprocess_data(data_to_process):
    # get all the dialogues
    inputs = [dialogue for dialogue in data_to_process['dialogue']]
    # tokenize the dialogues
    model_inputs = tokenizer(inputs, max_length=max_input, padding='max_length', truncation=True)
    # tokenize the summaries
    with tokenizer.as_target_tokenizer():
        targets = tokenizer(data_to_process['summary'], max_length=max_target, padding='max_length', truncation=True)

    # set labels
    model_inputs['labels'] = targets['input_ids']
    return model_inputs


# Setting training and evaluation datasets through tokenizer
train_dataset = train_dataset.map(preprocess_data, batched=True)
eval_dataset = eval_dataset.map(preprocess_data, batched=True)

# Loading the modal
model = AutoModelForSeq2SeqLM.from_pretrained(model_checkpoints)

# Fine-tuning args for new data
# Highest hyper parameter
# Metric      | Precision | Recall    | F-measure
# ------------------------------------------------
# Rouge-1     |  44.79%   |  49.39%   |  45.51%
# Rouge-2     |  21.92%   |  23.48%   |  21.97%
# Rouge-L     |  38.64%   |  42.74%   |  39.30%
# Rouge-Lsum  |  38.71%   |  42.78%   |  39.37%


args = Seq2SeqTrainingArguments(
    output_dir='dialogue_summarization_bart',
    evaluation_strategy='steps',
    eval_steps=500,
    learning_rate=3e-5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    gradient_accumulation_steps=4,
    weight_decay=0.01,
    save_total_limit=3,
    num_train_epochs=5,
    predict_with_generate=True,
    fp16=True,  # available only with CUDA
    warmup_steps=500,
    lr_scheduler_type='linear'
)

trainer = Seq2SeqTrainer(
    model,
    args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    tokenizer=tokenizer
)

# Optional if saving to device
#trainer.save_model("saved_model/dialsum")

# Training the modal
print('Modal training started.......')
trainer.train()
print('Modal training done!')