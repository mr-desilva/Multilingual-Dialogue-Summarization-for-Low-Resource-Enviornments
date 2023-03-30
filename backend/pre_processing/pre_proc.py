import pandas as pd
import json
import csv
import numpy as np
import re

# Reading main customer support dataset from kaggle
df_twcs = pd.read_csv('../original_datasets/twcs.csv')
print('twcs dataset loaded')

# opening jsonl files to map with main customer support data
with open('../original_datasets/tweet_sum_data_files/final_train_tweetsum.jsonl') as f:
    lines = f.read().splitlines()
    df_tweetsum_json = pd.DataFrame(lines)
    df_tweetsum_json.columns = ['json_element']

# preparing the TWEETSUM dataset files to a csv files with mapped coloumns
df_tweetsum_json['json_element'].apply(json.loads)
df_tweetsum_csv = pd.json_normalize(df_tweetsum_json['json_element'].apply(json.loads))
df_tweetsum_csv.to_csv('tweetsum_formated.csv')  # tweetsum json to csv
print('tweetsum_formated.csv done!')

list_tweet_id = []  # python list to append rows with tweet id
tweet_id_offset = 1  # tweet_id_offset coloumn in df_tweetsum_csv (tweetsum_formated.csv)
for index, col in df_tweetsum_csv.iterrows():
    arr = col[tweet_id_offset]
    df_row = pd.DataFrame(arr)

    # adding to a list
    list_tweet_id.append(df_row['tweet_id'])
# writing to a csv file with tweet id sequnce
df_final_output = pd.DataFrame(list_tweet_id)
df_final_output.to_csv('tweet_id_seq.csv')
print('tweet_id_seq.csv done!')

# Getting the Summary into a array
# df_tweetsum_csv['annotations']
summary_array = []
summary_id_offset = 2

for index, col in df_tweetsum_csv.iterrows():
    arr = col[summary_id_offset]
    df_summary = pd.DataFrame(arr)

    # adding to a list
    # print(df_summary['abstractive'])
    if (df_summary['abstractive'][0] == None):
        summary_array.append(df_summary['abstractive'][1])
    else:
        summary_array.append(df_summary['abstractive'][0])

print('abstract summaries loaded into array done, moving to cleaning process......')
# Finte tuning the format for modal
summary_array_cleaned = []

for summary in summary_array:
    result = " ".join("".join(sublist) for sublist in summary)
    summary_array_cleaned.append(result)

print('abstract summaries cleaning process done..')

# loading dataset with tweet id sequnce
df_preprocessed = pd.read_csv('tweet_id_seq.csv')

tweet_id_seq_arr = []  # array to append tweet id
arr = df_preprocessed.to_numpy()  # converting the dataframe to a numpy array with float numbers and NaN values


# function to remove float numbers
def formatNumber(num):
    if num % 1 == 0:
        return int(num)
    else:
        return num


# removing tweet_id text, and NaN values from the numpy array
print('removing NaN values from the numpy array')
for i in range(df_preprocessed.shape[0]):
    index = np.argwhere(arr[i] == 'tweet_id')
    y = np.delete(arr[i], index)
    z = y.tolist()
    cleanedList = [x for x in z if str(x) != 'nan']
    for i in range(len(cleanedList)):
        cleanedList[i] = formatNumber(cleanedList[i])
    tweet_id_seq_arr.append(cleanedList)

print('Creating dataset with matching tweet Ids')
# Creating dataset with matching tweet Ids
#   **dialogue | summary** format

# forward next final method---------------
# 0, 2, 4 ...
def customer_dialog(text):
    first = text.partition(' ')[0]
    customer_txt = text.replace(first, 'customer:')
    return customer_txt


# 1, 3, 5 ...
def support_dialog(text):
    first = text.partition(' ')[0]
    customer_txt = text.replace(first, 'support:')
    return customer_txt


def boundingCheck(boundValue, tweet):
    # customer tweet
    if boundValue == True:
        return customer_dialog(tweet)
    else:
        return support_dialog(tweet)


def removeLinks(text_withLink):
    return re.sub(r'http\S+', '', text_withLink)


def removeSpecialChar(text_withSchar):
    return re.sub(r'@\w+|#\w+', '', text_withSchar)


# main function to get all the tweet_id conversations to a seq array
review_array = []  # will use a separate array to store summary
# summary_array = [] # will save summary in order
for tweet_id in tweet_id_seq_arr[0]:
    text = df_twcs['text'].loc[df_twcs['tweet_id'] == tweet_id].values
    bounding = df_twcs['inbound'].loc[
        df_twcs['tweet_id'] == tweet_id].values  # bounding true = customer tweet, bounding false = agent
    text = boundingCheck(bounding, text[0])
    review_array.append(text)
# --------------------------------- ['customer: Missed 3 trains due to no parking spaces because of changes! What are
# you going to do? #didcotstation', 'support: Hello....]
print('Loading all tweet conversation to a array.... done')

print('Starting cleaning process for tweet conversations.....')
review_array_cleaned = []

for tweet_id in tweet_id_seq_arr:
    concat_tweet = ''
    for tweet in tweet_id:
        text = df_twcs['text'].loc[df_twcs['tweet_id'] == tweet].values
        bounding = df_twcs['inbound'].loc[
            df_twcs['tweet_id'] == tweet].values  # bounding true = customer tweet, bounding false = agent
        text = boundingCheck(bounding, text[0])
        concat_tweet = concat_tweet + ' ' + text
        cleaned_contact_tweet = removeLinks(concat_tweet)
        cleaned_special_char_tweet = removeSpecialChar(cleaned_contact_tweet)
    review_array_cleaned.append(cleaned_special_char_tweet)

print('Cleaning process for tweet conversations done.....')

print('Creating final dataset.....')
with open('tweetsum_formated.csv', mode='w', newline='', encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(['id', 'dialogue', 'summary'])
    for i, (a, b) in enumerate(zip(review_array_cleaned, summary_array_cleaned), start=1):
        writer.writerow([i, a, b])

print('Done.....')


