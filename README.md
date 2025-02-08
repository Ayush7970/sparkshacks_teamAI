# 🌱 Sustainable AI Farming Assistant

## 📌 Project Overview

This project proposes a technological solution aimed at sustainable AI innovation and environmentally friendly practices. By integrating an AI-powered chatbot tailored for farmers and a disaster prediction system based on real-time data, the platform enhances resource efficiency, minimizes environmental impact, and helps communities proactively respond to potential agricultural risks. The system is designed to assist farmers in optimizing resources, predicting disasters, and making data-driven decisions for sustainable agriculture.

## 🚀 Tech Stack

The technologies used in this project were chosen to create a scalable, efficient, and responsive system for sustainable farming. Flask provides a lightweight yet powerful backend for API development, while React.js ensures a seamless user experience. The integration of machine learning enables accurate disaster predictions, and the use of Ollama for AI-powered assistance helps farmers make data-driven decisions.

### Backend:

- **Python** (Flask) for API development
- **Machine Learning Model** for disaster prediction
- **APScheduler** for automated weekly forecasting tasks
- **Ollama** (LLM) for AI-powered farming assistance
- **Flask-CORS** to enable cross-origin requests
- **Email Integration** for alert notifications

### Frontend:

- **React.js** for the user interface
- **React Router** for navigation
- **Custom Components** for interactive user experience
- **CSS** for styling

## 🔧 Features

### Backend (Flask API)

The backend serves as the core of the application, handling data processing, user interactions, and AI-based predictions. It communicates with the frontend via a REST API and integrates external data sources such as weather forecasts to provide real-time insights.

- **User Registration:** Allows farmers to sign up for weekly disaster alerts via email.
- **Disaster Prediction:** Uses an ML model to assess risks and predict potential disasters.
- **Weekly Forecasting:** Automated job to check weekly weather conditions and send reports.
- **Farm Assistance:** Accepts user input regarding farm conditions and provides tailored recommendations.
- **AI Chatbot (Ollama Integration):** Answers farming-related queries using a fine-tuned LLM.
- **Natural Disaster Warning System:** Provides real-time alerts and advice based on weather data and disaster predictions.

### Frontend (React)

- **Home Page:** Overview of the platform.
- **External Resources:** Curated information for farmers.
- **Meet the Team:** Introduction to the development team.
- **About Page:** Information about the project’s mission and goals.
- **AI Chat Interface:** Allows users to interact with the AI assistant for guidance.

## 🏗 Project Structure

```
📂 Sustainable-AI-Farming-Assistant
│── backend/
│   │── app.py                # Flask backend API
│   │── ml_model.py           # ML model for disaster prediction
│   │── email_alert.py        # Email alert system
│   │── weather_data.py       # Dependencies
│   │── disaster_model.pkl    # LLM AI chatbot
|
│── frontend/
│   │── src/
│   │   │── Components/       # React UI components
│   │   │── Styles/           # CSS files
│   │   │── Assets/           # Asset files
│   │   │── App.js            # Main application file
│   │   │── index.js          # Entry point
|
│── model/
│   │── chatbot.py            # Main AI LLM python file
│   │── data-extract-v2.py    
│   │── data-extract-v3.py
│   │── training.py           # Trains the model
|
│── README.md                 # Project documentation
```

## 🛠 Installation & Setup

### System Requirements

- Python 3.8 or later
- Node.js 16 or later
- npm 8 or later
- Flask and required Python dependencies (listed in `requirements.txt`)
- React.js and required frontend dependencies (installed via `npm install`)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/Sustainable-AI-Farming-Assistant.git
   cd Sustainable-AI-Farming-Assistant/backend
   ```
2. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install flask flask_cors pandas numpy apscheduler requests
   ```
3. Run the Flask server:
   ```sh
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## 🌍 Contributing

We welcome contributions! Please submit pull requests for any enhancements or bug fixes.

## 📄 License

This project is licensed under the MIT License.

## 📬 Developers

This project was developed during a 24 hour long hackathon by the name of SparkHacks, held by University of Illinois Chicago.
This project was made by:
- Vansh "V" Mattraa
- Hanel Vujic
- Ayush Bhardwaj
- Anupam Sai Sistla
- Maaz Iqbal

