from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from datasets import load_dataset, load_metric

model_names = [
    "mr-desilva/bart-large-xsum-dialsum",  # Fine-tuned model
    "facebook/bart-large-cnn",             # Another pre-trained model
]

rouge = load_metric("rouge")

def generate_summary(model, tokenizer, dialogue):
    input_ids = tokenizer(dialogue, return_tensors="pt").input_ids
    summary_ids = model.generate(input_ids)
    summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary_text

dataset = load_dataset("csv", data_files="/content/drive/MyDrive/ColabNotebooks/Dataset/tweetsum_valid.csv")["train"]
dialogues = dataset["dialogue"]
reference_summaries = dataset["summary"]


for model_name in model_names:
    print(f"Evaluating model: {model_name}")
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    generated_summaries = [generate_summary(model, tokenizer, dialogue) for dialogue in dialogues]
    rouge_scores = rouge.compute(predictions=generated_summaries, references=reference_summaries)

    print("ROUGE-1:", rouge_scores["rouge1"])
    print("ROUGE-2:", rouge_scores["rouge2"])
    print("ROUGE-L:", rouge_scores["rougeL"])
    print("\n")
