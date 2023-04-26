import matplotlib.pyplot as plt
import numpy as np


rouge_scores = {
    "ROUGE-1": {"Precision": 44.79, "Recall": 49.39, "F-measure": 45.51},
    "ROUGE-2": {"Precision": 21.92, "Recall": 23.48, "F-measure": 21.97},
    "ROUGE-L": {"Precision": 38.64, "Recall": 42.74, "F-measure": 39.30},
    "ROUGE-Lsum": {"Precision": 38.71, "Recall": 42.78, "F-measure": 39.37}
}


def plot_grouped_rouge_scores(rouge_scores):
    metrics = list(rouge_scores.keys())
    scores = rouge_scores.values()

    # Define the width of the bars and their positions
    bar_width = 0.25
    bar_positions = np.arange(len(metrics))

    # Create the bar chart
    fig, ax = plt.subplots()
    precision_bars = ax.bar(bar_positions - bar_width, [score["Precision"] for score in scores], bar_width, label="Precision")
    recall_bars = ax.bar(bar_positions, [score["Recall"] for score in scores], bar_width, label="Recall")
    f_measure_bars = ax.bar(bar_positions + bar_width, [score["F-measure"] for score in scores], bar_width, label="F-measure")

    # Set the chart labels and formatting
    ax.set_xlabel("ROUGE Metrics")
    ax.set_ylabel("Scores (Percentage)")
    ax.set_title("ROUGE Scores Visualization")
    ax.set_xticks(bar_positions)
    ax.set_xticklabels(metrics)
    ax.legend()

    # Display the chart
    plt.show()

plot_grouped_rouge_scores(rouge_scores)
