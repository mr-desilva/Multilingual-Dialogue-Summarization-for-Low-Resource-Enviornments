from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.API.eng_to_eng.service import generate_dialogue_summary

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the Angular frontend


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Hello from Flask backend! to the angular"
    }
    return jsonify(data)


@app.route('/api/summarize', methods=['POST'])
def get_summary():
    data = request.json
    text = data.get('text', '')
    summary = generate_dialogue_summary(text)
    return jsonify(summary)


if __name__ == '__main__':
    app.run(debug=True)
