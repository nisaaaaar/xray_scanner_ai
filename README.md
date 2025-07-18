---

### ✅ `README.md`

# 🩻 X-Ray Scanner AI

A deep learning-powered web application that analyzes chest X-ray images to predict the likelihood of multiple thoracic diseases using a trained neural network. Built using a Flask backend and an optional React frontend, the system serves as a demo or assistive diagnostic tool for healthcare professionals and researchers.

---

## 🔍 Features

* 📤 Upload chest X-ray images (JPG, PNG).
* 🧠 Predicts probabilities of **14 thoracic conditions**:

  * Atelectasis, Cardiomegaly, Effusion, Infiltration, Mass, Nodule, Pneumonia, Pneumothorax, Consolidation, Edema, Emphysema, Fibrosis, Pleural Thickening, Hernia
* 📊 Displays predictions in a clean, user-friendly UI with confidence scores.
* 🔗 Exposes REST API for easy integration.
* 🧪 Can be containerized using Docker for deployment.

---

## 🛠️ Tech Stack

### 🔹 Backend (API + Model)

* **Python 3.8+**
* **Flask** – lightweight REST API
* **PyTorch** – deep learning inference engine
* **TorchVision** – image preprocessing
* **NumPy, Pillow, OpenCV** – for image manipulation
* **Model**: ResNet-based CNN fine-tuned on NIH ChestX-ray14 dataset

### 🔹 Frontend (Optional UI)

* **React.js** – modern UI framework
* **Axios** – for API communication
* **Tailwind CSS / Bootstrap** – for styling (optional)

---

## 🧠 Model Details

* Trained on [NIH Chest X-ray14 Dataset](https://nihcc.app.box.com/v/ChestXray-NIHCC)
* **Multi-label classification** model using BCEWithLogitsLoss
* Input size: 224×224 grayscale images
* Output: Probabilities for each of the 14 diseases

---

## 🖼 Sample Prediction Output

| Disease       | Probability |
| ------------- | ----------- |
| Pneumonia     | 28.2%       |
| Consolidation | 53.1%       |
| Infiltration  | 50.2%       |
| Atelectasis   | 34.6%       |
| ...           | ...         |

> 🩺 **Doctor's note**:
> *"Your scan suggests signs of consolidation and pneumonia. These findings should be further evaluated by a qualified radiologist or pulmonologist."*

---

## ⚙️ Setup Instructions

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/xray-scanner-ai.git
cd xray-scanner-ai
```

### 🔧 2. Backend Setup (Flask API)

```bash
cd Backend
python -m venv venv
venv\Scripts\activate   # Windows
# OR
source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
python app.py
```

> 🧠 Model Weights:
> Place your trained model file here:

```
Backend/models/model.pth.tar
```

---

### 🖥 3. Frontend Setup (React UI – Optional)

```bash
cd Frontend
npm install
npm start
```

> Make sure the API URL in `Frontend/src/api/index.js` points to your running Flask backend (e.g. `http://localhost:5000`).

---

## 🧱 Architecture Overview

```plaintext
[User Uploads X-ray]
       ⬇
    React Frontend (Optional)
       ⬇
   Flask Backend API (Python)
       ⬇
    Model Inference (PyTorch)
       ⬇
  Prediction Probabilities (14 classes)
       ⬇
      Displayed on UI
```

---

## 📂 Project Structure

```
xray-scanner-ai/
├── Backend/
│   ├── app.py               # Flask entrypoint
│   ├── model_utils.py       # Model loading & prediction
│   ├── models/
│   │   └── model.pth.tar    # Trained model weights
│   ├── utils/
│   └── requirements.txt
│
├── Frontend/ (optional)
│   ├── public/
│   ├── src/
│   └── ...
│
├── README.md
└── .gitignore
```

---

## 📝 Requirements

**Backend:**

* Flask
* PyTorch
* torchvision
* Pillow
* NumPy
* OpenCV (optional)

**Frontend (optional):**

* Node.js ≥ 14.x
* React
* Axios

---

## 🧪 Testing

To test the backend:

```bash
curl -X POST http://localhost:5000/predict \
     -F image=@sample_chest_xray.jpg
```

To test the frontend, simply upload an image via the browser interface.

---

## ❗ Disclaimer

* This is a **research/educational** tool and **not approved** for clinical diagnosis.
* Always consult with certified medical professionals.
* Predictions are probabilistic — not definitive.

---

## 🤝 Contribution

Contributions are welcome! You can:

* Raise issues
* Suggest improvements
* Submit pull requests for bug fixes or features

---

## 📜 License

MIT License © 2025 [Nisar Ahmad](mailto:nisara305@gmail.com)

---
