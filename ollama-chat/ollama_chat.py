"""
Authors: Ayush, Anupam, Vansh, Hanel, Maaz
Date: 02-08-2025
Description:
    Accept user input from React frontend and pipe it into an Ollama query.
    Makes use of Flask to open a localhost on port 5000. If port 5000 is busy,
    we search linearly for the next open port, up till a range of "portRange."
"""

import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

# Ollama API endpoint
OLLAMA_API_URL = "http://localhost:11434/api/generate"

def tryPort(startingPort, portRange):
    return startingPort
    # while i < portRange
    # check if start + i is a free port
    # if so, return that number
    # if we exit loop, no port in range [start, start + portRange] is free so return -1 or something

# def freePort(tryPort):
    # check if tryPort is an available port for Flask

@app.route("/chat", methods=["POST"])
def chat():
    """
    Receives a message from the frontend, sends it to Ollama, and returns the response.
    """
    data = request.json
    user_input = data.get("message", "")

    # handle empty input
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    payload = {
        "model": "mistral",  # Change to another model if needed
        "prompt": user_input,
        "stream": False  # Change to True for streaming responses
    }

    try:
        # Send request to Ollama API
        response = requests.post(OLLAMA_API_URL, json=payload)

        # code 200 OK = successful request
        if response.status_code == 200:
            response_data = response.json()
            bot_response = response_data.get("response", "No response received.")
            return jsonify({"response": bot_response})
        else:
            return jsonify({"error": f"Error from Ollama: {response.status_code}, {response.text}"}), 500
    except Exception as e:
        return jsonify({"error": f'RUNTIME ERROR: {str(e)}'}), 500  # runtime error, embolden so it sticks out in output

if __name__ == "__main__":
    print("Starting Flask server...")
    availablePort = tryPort(5000, 20)   # starting from 5000, keep trying 20 ports after to look for an available one

    app.run(port=availablePort, debug=True)  # Run Flask on port 5000
