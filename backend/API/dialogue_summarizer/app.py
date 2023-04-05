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
    lang_detect = 'English'
    data = request.json
    text = data.get('text', '')
    summary = generate_dialogue_summary(text)
    return jsonify({'summary': summary, 'lang': lang_detect})


# Any language summary generation endpoint
@app.route('/api/summarize/multi', methods=['POST'])
def get_summary_multi():
    data = request.json
    text = data.get('text', '')
    summary, lang_detect = generate_mult_dialogue_summary(text)
    return jsonify({'summary': summary, 'lang': lang_detect})


if __name__ == '__main__':
    app.run(debug=True)
