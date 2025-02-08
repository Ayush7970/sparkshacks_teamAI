from flask import Flask, request, jsonify
import smtplib
import os
from email.mime.text import MIMEText
import re

# Load credentials from environment variables
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "ayush975600@gmail.com")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "sauz xooq bdte cmnq")  # Use an App Password

# Function to validate email format
def is_valid_email(email):
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(email_regex, email)

def send_email_alert(subject, message, recipient_email):
    if not SENDER_EMAIL or not SENDER_PASSWORD:
        return {"error": "Missing email credentials"}, 400

    # Validate the recipient email
    if not is_valid_email(recipient_email):
        return {"error": "Invalid recipient email"}, 400

    msg = MIMEText(message)
    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg["To"] = recipient_email  # ✅ Send directly to user

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, recipient_email, msg.as_string())
        return {"success": f"Email Alert Sent to {recipient_email}!"}, 200
    except smtplib.SMTPException as e:
        return {"error": f"Failed to send email - {str(e)}"}, 500


def send_email():
    data = request.json
    subject = data.get("name")
    message = data.get("email")

    if not subject or not message:
        return jsonify({"error": "Missing subject or message"}), 400

    response, status = send_email_alert(subject, message)
    return jsonify(response), status


