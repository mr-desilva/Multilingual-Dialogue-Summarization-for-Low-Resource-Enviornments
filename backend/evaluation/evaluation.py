# Load the modal and run through evaluation metrics
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from datasets import load_metric
from datasets import load_dataset

fine_tuned_modal_name = '../modal'
tokenizer_fine_tuned = AutoTokenizer.from_pretrained(fine_tuned_modal_name)
fine_tuned_modal = AutoModelForSeq2SeqLM.from_pretrained(fine_tuned_modal_name)

print('modal loaded!')


def generate_dialogue_summary(dialogue):
    max_new_tokens = 50
    input_ids = tokenizer_fine_tuned(dialogue, return_tensors='pt').input_ids
    summary_ids = fine_tuned_modal.generate(input_ids, max_new_tokens=max_new_tokens)
    summary_text = tokenizer_fine_tuned.decode(summary_ids[0], skip_special_tokens=True)
    return summary_text

rouge = load_metric("rouge")
dataseteval = load_dataset("csv", data_files="../datasets/tweetsum_valid.csv")["train"]


generated_summaries = [generate_dialogue_summary(example["dialogue"]) for example in dataseteval]
ground_truths = [example["summary"] for example in dataseteval]

rouge_score = rouge.compute(predictions=generated_summaries, references=ground_truths)
rouge1_f1 = rouge_score["rouge1"].mid.fmeasure
rouge2_f1 = rouge_score["rouge2"].mid.fmeasure
rougeL_f1 = rouge_score["rougeL"].mid.fmeasure



print(rouge_score)
print("ROUGE-1:", rouge_score["rouge1"])
print("ROUGE-2:", rouge_score["rouge2"])
print("ROUGE-L:", rouge_score["rougeL"])