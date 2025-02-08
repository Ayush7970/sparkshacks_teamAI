import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

# Ollama API endpoint
OLLAMA_API_URL = "http://localhost:11434/api/generate"

@app.route("/chat", methods=["POST"])
def chat():
    """
    Receives a message from the frontend, sends it to Ollama, and returns the response.
    """
    data = request.json
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    # Prepare the request payload for Ollama
    payload = {
        "model": "mistral",  # Change to another model if needed
        "prompt": user_input,
        "stream": False  # Change to True for streaming responses
    }

    try:
        # Send request to Ollama API
        response = requests.post(OLLAMA_API_URL, json=payload)

        if response.status_code == 200:
            response_data = response.json()
            bot_response = response_data.get("response", "No response received.")
            return jsonify({"response": bot_response})
        else:
            return jsonify({"error": f"Error from Ollama: {response.status_code}, {response.text}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(port=5000, debug=True)  # Run Flask on port 5000
