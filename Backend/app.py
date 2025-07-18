from flask import Flask, request, jsonify
from flask_cors import CORS
from model_utils import load_model, predict

app = Flask(__name__)
CORS(app)
model = load_model()

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/analyze", methods=["POST"])
def analyze():
    if 'xray' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['xray']
    image_bytes = file.read()

    try:
        results = predict(image_bytes, model)
        if results:
            insights = "; ".join([f"{disease}: {confidence*100:.1f}%" for disease, confidence in results])
        else:
            insights = "No significant abnormalities detected above confidence threshold."
        return jsonify({"insights": insights})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
