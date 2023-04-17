import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Read the CSV file
# Final decided threshold value is 60
df = pd.read_csv("../datasets/tweetsum_train.csv")
# Extract the 'dialogue' column and convert it to a list
dialogues = df["dialogue"].tolist()


# Calculate the number of words in each dialogue
def input_length(text):
    return len(text.split())


dialogue_lengths = [input_length(dialogue) for dialogue in dialogues]

# Compute summary statistics
mean_length = np.mean(dialogue_lengths)
median_length = np.median(dialogue_lengths)
std_length = np.std(dialogue_lengths)
min_length = np.min(dialogue_lengths)
max_length = np.max(dialogue_lengths)

print(
    f"Mean: {mean_length}, Median: {median_length}, Standard Deviation: {std_length}, Min: {min_length}, Max: {max_length}")

# Visualize the distribution using a histogram
plt.hist(dialogue_lengths, bins="auto")
plt.xlabel("Dialogue Length (Words)")
plt.ylabel("Frequency")
plt.title("Histogram of Dialogue Lengths")
plt.show()
