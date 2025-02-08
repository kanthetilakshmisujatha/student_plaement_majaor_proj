import pandas as pd
from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React app

# Load the KNN model
with open('knn_model1.pkl', 'rb') as model_file:
    knn_model1 = pickle.load(model_file)

def safe_float(value, default=0.0):
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive data from frontend
        data = request.json
        print(f"Received data: {data}")
        
        gender = 1 if data.get('gender', '').lower() == 'male' else 0
        print(f"Gender: {gender}")

        ssc_percentage = safe_float(data.get('ssc_p'))
        puc_percentage = safe_float(data.get('puc_p'))
        btech_percentage = safe_float(data.get('btech_p'))
        work_experience = safe_float(data.get('workex'))
        etest_percentage = safe_float(data.get('etest_p'))

        print(f"ssc_percentage: {ssc_percentage}, puc_percentage: {puc_percentage}, "
              f"btech_percentage: {btech_percentage}, work_experience: {work_experience}, "
              f"etest_percentage: {etest_percentage}")
        
        # Prepare data for prediction
        sample_df = pd.DataFrame({
            'Gender': [gender],
            'SSC Percentage': [ssc_percentage],
            'PUC Percentage': [puc_percentage],
            'BTech Percentage': [btech_percentage],
            'Work Experience': [work_experience],
            'E-test Percentage': [etest_percentage]
        })

        print(f"Data for prediction: {sample_df}")

        # Get prediction and probability from the model
        prediction = knn_model1.predict(sample_df)
        probability = knn_model1.predict_proba(sample_df)

        print(f"Prediction: {prediction}")
        print(f"Probability: {probability}")

        result = "Placed" if prediction[0] == 1 else "Not Placed"
        probability_placed = round(probability[0][1] * 100, 1)
        print(f"Final result: {result}, Probability of Placed: {probability_placed}")

        return jsonify({
            'result': result,
            'probability_placed': probability_placed
        })

    except Exception as e:
        print("Unexpected Error:", e)
        return jsonify({'error': f"Unexpected Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
