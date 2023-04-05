from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from datasets import load_metric
from datasets import load_dataset

fine_tuned_modal_name = '../../modal'
tokenizer_fine_tuned = AutoTokenizer.from_pretrained(fine_tuned_modal_name)
fine_tuned_modal = AutoModelForSeq2SeqLM.from_pretrained(fine_tuned_modal_name)

print('modal loaded!')


def generate_dialogue_summary(dialogue):
    max_new_tokens = 50
    input_ids = tokenizer_fine_tuned(dialogue, return_tensors='pt').input_ids
    summary_ids = fine_tuned_modal.generate(input_ids, max_new_tokens=max_new_tokens)
    summary_text = tokenizer_fine_tuned.decode(summary_ids[0], skip_special_tokens=True)
    return summary_text


# sum = ''''Customer: Hey, I need to check why my phone is loosing signal ?
# Support: Hello, can I know the phone modal?
# Customer: Yes, this is a iphone 14?
# Support: Did you check for any software updates ? if not please update your device to latest version.
# Customer: Yes, there is a software update, I'll try and let you know.
# Support: Sure
# Customer: I have updates the software to the latest version and now the signal loosing issue is resolved.
# Support: Happy to help.'''
#
# print(generate_dialogue_summary(sum))


# sum = ''''Customer: Hey, I have to check why my phone loses the signal?
# Support: Hello, I can know the phone modal?
# Customer: Yes, this is an iPhone 14?
# Support: Have you searched for software updates? If not, please update your device to the latest version.
# Customer: Yes, there is a software update, I will try to inform you.
# Support: Safe
# Customer: I have updated the software to the latest version and now the problem with the signal loss is solved.
# Support: please help.'''

# print(generate_dialogue_summary(sum))