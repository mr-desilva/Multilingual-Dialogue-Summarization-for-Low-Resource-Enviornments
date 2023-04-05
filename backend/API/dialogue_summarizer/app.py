from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.API.dialogue_summarizer.service_multi_lang import generate_dialogue_summary, generate_mult_dialogue_summary

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the Angular frontend


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Hello from Flask backend! to the angular"
    }
    return jsonify(data)


# English to English summary generation endpoint
@app.route('/api/summarize', methods=['POST'])
def get_summary():
    data = request.json
    text = data.get('text', '')
    summary = generate_dialogue_summary(text)
    return jsonify(summary)


# Any language summary generation endpoint
@app.route('/api/summarize/multi', methods=['POST'])
def get_summary_multi():
    data = request.json
    text = data.get('text', '')
    summary = generate_mult_dialogue_summary(text)
    return jsonify(summary)


if __name__ == '__main__':
    app.run(debug=True)
