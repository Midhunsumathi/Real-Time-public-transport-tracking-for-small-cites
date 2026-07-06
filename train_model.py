import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Dataset
df = pd.read_csv("datasets/transport_data.csv")

X = df[["latitude", "longitude"]]
y = df["delay"]

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Save Model
joblib.dump(model, "models/delay_model.pkl")

print("✅ Model saved successfully!")