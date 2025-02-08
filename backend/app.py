from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os
from ml_model import predict_disaster
from email_alert import send_email_alert
from ml_model import check_weekly_forecast, send_weekly_summary
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS
from datetime import datetime
import requests

OLLAMA_API_URL = "http://localhost:11434/api/generate"

app = Flask(__name__)
# CORS(app, resources={r"/signup": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

# Store user emails (In production, use a database)
users = {}
# Store form submissions (for now, using a list instead of a database)
farm_submissions = []

@app.route("/")
def home():
    return "🚀 Disaster Prediction API is running!"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"message": "Missing name or email."}), 400

    users[email] = name

    message = f"Hello {name},\n\nYou are now registered for weekly disaster alerts!\nYou'll receive an email only if a disaster is predicted."
    subject = "📢 Subscribed for Disaster Alerts!"
    send_email_alert(subject, message, email)

    
    return jsonify({"message": "Successfully signed up for alerts!"}), 200

# 🛠 Function to run every Monday at 9 AM
def run_weekly_forecast():
    print(f"Running weekly forecast check at {datetime.now()}")
    check_weekly_forecast()
    send_weekly_summary()

# 🛠 Schedule the task to run every Monday at 9 AM
scheduler = BackgroundScheduler()
scheduler.add_job(run_weekly_forecast, "cron", day_of_week="mon", hour=9, minute=0)
scheduler.start()

@app.route("/farm-assistant", methods=["POST"])
def farm_assistant():
    """
    Handles farming form submissions and queries the Llama model.
    """
    data = request.get_json()  # ✅ Get JSON data from frontend

    if not data:
        return jsonify({"error": "No data received"}), 400

    # ✅ Extract form fields
    name = data.get("name")
    location = data.get("location")
    land_size = data.get("landSize")
    crop_type = data.get("cropType")
    budget = data.get("budget")

    if not all([name, location, land_size, crop_type, budget]):
        return jsonify({"error": "All fields are required"}), 400

    farm_submissions.append(data)  # ✅ Store form data
    print(f"Stored farming data: {data}")  # ✅ Debugging

    return jsonify({"message": "Form submitted successfully!"}), 200

@app.route("/chat", methods=["POST"])
def chat():
    """
    Receives a message from the frontend, sends it to Ollama, and returns the response.
    """
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    # ✅ Prepare request payload for Ollama
    payload = {
        "model": "llama3",  # ✅ Use correct model (change if needed)
        "prompt": user_input,
        "stream": False  # Change to True for streaming responses
    }

    try:
        # ✅ Send request to Ollama API
        response = requests.post(OLLAMA_API_URL, json=payload)

        if response.status_code == 200:
            response_data = response.json()
            bot_response = response_data.get("response", "No response received.")
            return jsonify({"response": bot_response})
        else:
            return jsonify({"error": f"Ollama error: {response.status_code}, {response.text}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)