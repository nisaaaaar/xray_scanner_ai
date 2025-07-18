import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from io import BytesIO

# ✅ Constants
DISEASE_CLASSES = [
    "Atelectasis", "Cardiomegaly", "Effusion", "Infiltration",
    "Mass", "Nodule", "Pneumonia", "Pneumothorax",
    "Consolidation", "Edema", "Emphysema", "Fibrosis",
    "Pleural_Thickening", "Hernia"
]

# ✅ Model path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
checkpoint_path = os.path.join(BASE_DIR, 'models', 'model.pth.tar')

# ✅ Model definition (same as original CheXNet)
class DenseNet121(nn.Module):
    def __init__(self, out_size=14):
        super(DenseNet121, self).__init__()
        self.densenet121 = models.densenet121(pretrained=True)  # ← Use pretrained
        num_ftrs = self.densenet121.classifier.in_features
        self.densenet121.classifier = nn.Sequential(
            nn.Linear(num_ftrs, out_size),
            nn.Sigmoid()  # For multi-label output
        )

    def forward(self, x):
        return self.densenet121(x)

# ✅ Clean state_dict for non-parallel model
def remove_module_prefix(state_dict):
    from collections import OrderedDict
    new_state_dict = OrderedDict()
    for k, v in state_dict.items():
        new_key = k.replace("module.", "") if k.startswith("module.") else k
        new_state_dict[new_key] = v
    return new_state_dict

# ✅ Model loader
def load_model(device=None):
    try:
        device = device or torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = DenseNet121(out_size=14).to(device)

        checkpoint = torch.load(checkpoint_path, map_location=device)
        state_dict = checkpoint.get('state_dict', checkpoint)

        # Clean state_dict
        if any(k.startswith("module.") for k in state_dict):
            print("[ℹ️] Removing 'module.' prefix from keys...")
            state_dict = remove_module_prefix(state_dict)

        missing, unexpected = model.load_state_dict(state_dict, strict=False)
        if missing or unexpected:
            print("[⚠️] State dict issues - Missing:", missing, "Unexpected:", unexpected)

        model.eval()
        print("[✅] Model loaded successfully.")
        return model.to(device)

    except Exception as e:
        print("[❌] Error loading model:", str(e))
        raise e

# ✅ Image preprocessing
def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    return transform(image).unsqueeze(0)  # shape: [1, 3, 224, 224]

# ✅ Inference
def predict(image_bytes, model, threshold=0.05, device=None):
    device = device or next(model.parameters()).device
    tensor = transform_image(image_bytes).to(device)

    with torch.no_grad():
        outputs = model(tensor)  # [1, 14]
        probs = outputs[0]       # [14]

        print("[ℹ️] Raw Probabilities:", probs.tolist())  # Debugging

        results = [
            (DISEASE_CLASSES[i], round(prob.item(), 3))
            for i, prob in enumerate(probs)
            if prob >= threshold
        ]

    return results or [("No significant findings above threshold", 0.0)]
