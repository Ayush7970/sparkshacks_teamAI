import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import os

# Define crop types and filenames
crop_files = {
    "rice": "rice_data.csv",
    "wheat": "wheat_data.csv",
    "barley": "barley_data.csv",
    "beans": "beans_data.csv",
}

# Function to load and merge all crop data
def load_data():
    all_data = []
    for crop, filename in crop_files.items():
        if os.path.exists(filename):  # Ensure the file exists
            df = pd.read_csv(filename)
            df["crop"] = crop  # Add crop type
            all_data.append(df)
        else:
            print(f"Warning: {filename} not found. Skipping {crop} data.")
    
    if all_data:
        return pd.concat(all_data, ignore_index=True)
    else:
        raise FileNotFoundError("No crop data files found!")

# Load dataset
df = load_data()

# Drop rows with missing values
df = df.dropna()

# Separate features and target
features = ["soil_ph", "nitrogen", "phosphorus", "potassium", "moisture"]
X = df[features]
y = df["productivity_score"]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train ML model
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Function to predict and rank farms
def rank_farms(crop_name):
    crop_farms = df[df["crop"] == crop_name].copy()
    X_crop = scaler.transform(crop_farms[features])
    crop_farms["predicted_score"] = model.predict(X_crop)
    
    # Sort and display top 3 farms
    top_farms = crop_farms.sort_values(by="predicted_score", ascending=False).head(3)
    print(f"\nTop 3 Farms for {crop_name.capitalize()}:\n")
    print(top_farms[["farm_id", "predicted_score"]].to_string(index=False))

# CLI Interaction
if __name__ == "__main__":
    print("Available Crops: rice, wheat, barley, beans")
    selected_crop = input("Enter crop type to analyze: ").strip().lower()
    
    if selected_crop in crop_files:
        rank_farms(selected_crop)
    else:
        print("Invalid crop type. Please enter one of: rice, wheat, barley, beans.")
