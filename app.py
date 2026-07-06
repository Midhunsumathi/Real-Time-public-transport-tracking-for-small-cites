from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from random import uniform
app = Flask(__name__)
CORS(app)

# Load ML model
model = joblib.load("models/delay_model.pkl")

# Home Route
@app.route('/')
def home():
    return "Transport Tracker Backend is Running!"

from random import uniform

@app.route('/api/location')
def get_location():

    latitude = round(uniform(13.0800,13.0900),6)
    longitude = round(uniform(80.2600,80.2800),6)

    return jsonify({
        "latitude": latitude,
        "longitude": longitude
    })
@app.route('/api/predict')
def predict():

    latitude = round(uniform(13.0800,13.0900),6)
    longitude = round(uniform(80.2600,80.2800),6)

    prediction = model.predict(np.array([[latitude, longitude]]))

    return jsonify({
        "latitude": latitude,
        "longitude": longitude,
        "predicted_delay": round(float(prediction[0]),2)
    })
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)