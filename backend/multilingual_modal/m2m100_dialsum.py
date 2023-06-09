import langid
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Dialogue summarizer modal
fine_tuned_modal_name = '../modal'
tokenizer_fine_tuned = AutoTokenizer.from_pretrained(fine_tuned_modal_name)
fine_tuned_modal = AutoModelForSeq2SeqLM.from_pretrained(fine_tuned_modal_name)

# m2m machine translation modal
model_name = "facebook/m2m100_418M"
tokenizer = M2M100Tokenizer.from_pretrained(model_name)
model = M2M100ForConditionalGeneration.from_pretrained(model_name)


def generate_mult_dialogue_summary(dialogue):
    # Identify the source lang code
    src_lang_code = identify_src_lang(dialogue)
    print('Identified lang code for the input: ' + src_lang_code)
    # Translate dialogue to English
    translated_dialogue = m2m_translation(dialogue, src_lang_code, "en")

    # Summarize dialogue in English
    max_new_tokens = 50
    input_ids = tokenizer_fine_tuned(translated_dialogue, return_tensors='pt').input_ids
    summary_ids = fine_tuned_modal.generate(input_ids, max_new_tokens=max_new_tokens)
    summary_text = tokenizer_fine_tuned.decode(summary_ids[0], skip_special_tokens=True)

    print('summary text ' + summary_text)

    # Translate summary back to the source language
    translated_summary = m2m_translation(summary_text, 'en', src_lang_code)

    return translated_summary


def identify_src_lang(dialogue):
    # Split the sentence into words
    words = dialogue.split()
    # Take the first 10 words
    first_10_words = words[:10]
    # Join the first 10 words to form a new sentence
    trimmed_sentence = " ".join(first_10_words)
    src_lang_code, confidence = langid.classify(trimmed_sentence)
    return src_lang_code


def m2m_translation(text, src_lang_code, tgt_lang_code):
    tokenizer.src_lang = src_lang_code
    input_tokens = tokenizer(text, return_tensors="pt")  # tokenizing source sentence
    translation_output = model.generate(**input_tokens, forced_bos_token_id=tokenizer.get_lang_id(
        tgt_lang_code))  # setting the model to generate the output based on the target lang code.
    translated_sentence = tokenizer.decode(translation_output[0], skip_special_tokens=True)
    print('translated sentence in english - ' + translated_sentence)
    return translated_sentence


# dialogue = '''Kunde: Hey, ich muss überprüfen, warum mein Telefon das Signal verliert? Support: Hallo, kann ich das Telefonmodal kennen? Kunde: Ja, das ist ein iPhone 14? Support: Haben Sie nach Software-Updates gesucht? Wenn nicht, aktualisieren Sie bitte Ihr Gerät auf die neueste Version. Kunde: Ja, es gibt ein Software-Update, ich werde versuchen, es Ihnen mitzuteilen. Unterstützung: Sicher Kunde: Ich habe die Software auf die neueste Version aktualisiert und jetzt ist das Problem mit dem Signalverlust behoben. Support: Helfen gerne.'''
# print(generate_mult_dialogue_summary(dialogue))

