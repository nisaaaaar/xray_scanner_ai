### ✅ `README.md`

# 🩻 X-Ray Scanner AI

A deep learning-powered web application built with Flask and PyTorch that analyzes chest X-ray images to predict the likelihood of multiple thoracic diseases.

---

## 🔍 Features

- Upload chest X-ray images.
- Predicts the probability of 14 common thoracic diseases:
  - Atelectasis, Cardiomegaly, Effusion, Infiltration, Mass, Nodule, Pneumonia, Pneumothorax, Consolidation, Edema, Emphysema, Fibrosis, Pleural Thickening, Hernia
- Visualizes predictions with confidence scores.
- Designed with a clean React frontend and Flask backend.
- Docker & REST API ready (optional).

---

## 🖼 Sample Prediction Output

| Disease              | Probability |
|----------------------|-------------|
| Pneumonia            | 28.2%       |
| Consolidation        | 53.1%       |
| Infiltration         | 50.2%       |
| Atelectasis          | 34.6%       |
| ...                  | ...         |

> 📢 *“There are signs of pneumonia and consolidation. Please consult a radiologist or specialist for clinical interpretation.”*

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/xray-scanner-ai.git
cd xray-scanner-ai
````

### 2. Setup Backend (Flask + PyTorch)

```bash
cd Backend
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On macOS/Linux

pip install -r requirements.txt
python app.py
```

### 3. Upload Model Weights

Place your model weights in:

```
Backend/models/model.pth.tar
```

Make sure your model is compatible with the prediction logic in `model_utils.py`.

---

## 🧠 Model

* Trained on [NIH Chest X-ray14 Dataset](https://nihcc.app.box.com/v/ChestXray-NIHCC).
* Multi-label classification using a ResNet-based architecture.
* Outputs raw disease probabilities for all 14 classes.

---

## 🌐 Frontend (Optional)

If you're using a React frontend, run it like so:

```bash
cd Frontend
npm install
npm start
```

---

## 📂 Project Structure

```
xray-scanner-ai/
│
├── Backend/
│   ├── app.py
│   ├── model_utils.py
│   ├── models/
│   │   └── model.pth.tar
│   ├── utils/
│   └── requirements.txt
│
├── Frontend/  # Optional
│   ├── public/
│   ├── src/
│   └── ...
│
├── README.md
└── .gitignore
```

---

## 📝 Requirements

* Python ≥ 3.8
* PyTorch
* Flask
* torchvision
* Pillow
* NumPy
* OpenCV (optional)
* React (if using frontend)

---

## 📌 Notes

* This tool is for **research and educational purposes** only.
* Not FDA/CE approved for clinical use.
* Always consult a qualified radiologist or medical professional for diagnosis.

---

## 🤝 Contribution

Contributions are welcome! Please open issues or submit pull requests.

---

## 📜 License

MIT License © 2025 [Nisar Ahmad](mailto:nisara305@gmail.com)

