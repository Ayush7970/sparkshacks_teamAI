import json
import pandas as pd
import pickle
import os
from weather_data import get_weather_forecast  # Import forecast function
from email_alert import send_email_alert

import subprocess
import time

def get_users():
    from app import users  # ✅ Importing inside function avoids circular import
    return users

def start_ollama():
    """Ensures Ollama is running before making requests."""
    try:
        # Check if Ollama is running
        result = subprocess.run(["ollama", "--version"], capture_output=True, text=True)
        if "could not connect" in result.stdout or result.returncode != 0:
            print("🚀 Starting Ollama...")
            subprocess.Popen(["/usr/local/opt/ollama/bin/ollama", "serve"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            time.sleep(2)  # Wait 2 seconds to ensure it starts
    except Exception as e:
        print(f"❌ Error starting Ollama: {e}")

# ✅ Start Ollama before running the script
start_ollama()

def generate_weather_summary(forecast):
    """Uses Llama (via Ollama) to generate a farming-specific weekly weather summary."""

    # ✅ Format weather data for Llama
    weather_text = "\n".join([
        f"{day['date']}: Temp {day['temperature']}°C, Humidity {day['humidity']}%, Wind {day['wind_speed']} km/h"
        for day in forecast
    ])

    prompt = f"""
    You are an expert agricultural advisor. Based on the following weekly weather data, provide a concise report tailored for farmers:

    {weather_text}

    The summary should:
    - Alert farmers about extreme weather conditions like heavy rain, drought, storms, or temperature extremes.
    - Recommend actions such as irrigation, pest control, or crop protection based on weather patterns.
    - Be clear, professional, and no longer than 3-4 sentences.

    Example:
    - "Looking at the range of temperatures, there is no need to worry about extreme weather for this week."
    - "Since there is less rain forecasted, soil moisture may drop. Consider additional irrigation."
    - "High humidity and rising temperatures may increase the risk of fungal diseases. Farmers should monitor crops closely."

    Generate a similar concise weekly summary for the following data:
    """

    try:
        # ✅ Use Llama via Ollama to generate response
        result = subprocess.run(["ollama", "run", "llama3", prompt], capture_output=True, text=True)
        summary = result.stdout.strip()
        return summary
    except Exception as e:
        print(f"❌ Llama API Error: {e}")
        return "Weather summary unavailable."

def send_weekly_summary():
    """Generates and sends a weekly weather summary to all users."""
    forecast = get_weather_forecast()
    if not forecast:
        print("❌ Could not retrieve weather data.")
        return

    weather_summary = generate_weather_summary(forecast)  # ✅ Generate AI-powered summary
    users = get_users()
    for email in users:
        email_subject = "🌤 Weekly Weather Summary"
        email_body = f"Hello,\n\nHere is your weekly weather summary:\n\n{weather_summary}\n\nStay safe!"

        send_email_alert(email_subject, email_body, email)

# Function to load and predict using the trained model
def predict_disaster(temp, humidity, wind_speed):
    # Ensure the model file exists
    if not os.path.exists("disaster_model.pkl"):
        print("❌ Model file not found. Please train the model first.")
        return None

    # Load the trained model
    with open("disaster_model.pkl", "rb") as f:
        loaded_model = pickle.load(f)

    # Convert input into a DataFrame to match training format
    input_data = pd.DataFrame([[temp, humidity, wind_speed]], columns=["temperature", "humidity", "wind_speed"])

    # Make prediction
    prediction = loaded_model.predict(input_data)
    return "🚨 Disaster Warning!" if prediction[0] == 1 else "✅ No Threat"


# Function to process weekly forecast
def check_weekly_forecast():
    forecast = get_weather_forecast()
    if not forecast:
        print("❌ Could not retrieve weather data.")
        return

    for day in forecast:
        prediction = predict_disaster(day["temperature"], day["humidity"], day["wind_speed"])
        print(f"{day['date']}: {prediction}")

        # If a disaster is predicted, send an email alert
        users = get_users()
        if "Disaster Warning" in prediction:
             for email, user_data in users.items():  # ✅ Now loops through all users
                subject = f"🚨 ALERT: Disaster Predicted on {day['date']}"
                message = f"Hello {user_data['name']},\n\n{prediction}\nTake preventive action.\n\nStay safe!"
                
                send_email_alert(subject, message, email)

