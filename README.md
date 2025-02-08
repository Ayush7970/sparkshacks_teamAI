# 🌱 Sustainable AI Farming Assistant

## 📌 Project Overview
This project proposes a technological solution aimed at sustainable AI innovation and environmentally friendly practices. The system is designed to assist farmers in optimizing resources, predicting disasters, and making data-driven decisions for sustainable agriculture.

## 🚀 Tech Stack
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
- **User Registration:** Allows farmers to sign up for weekly disaster alerts via email.
- **Disaster Prediction:** Uses an ML model to assess risks and predict potential disasters.
- **Weekly Forecasting:** Automated job to check weekly weather conditions and send reports.
- **Farm Assistance:** Accepts user input regarding farm conditions and provides tailored recommendations.
- **AI Chatbot (Ollama Integration):** Answers farming-related queries using a fine-tuned LLM.

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
│   │── requirements.txt      # Dependencies
│── frontend/
│   │── src/
│   │   │── Components/       # React UI components
│   │   │── Styles/           # CSS files
│   │   │── App.js            # Main application file
│   │   │── index.js          # Entry point
│── README.md                 # Project documentation
```

## 🛠 Installation & Setup
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
   pip install -r requirements.txt
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

## 📬 Contact
For any queries, feel free to reach out!

