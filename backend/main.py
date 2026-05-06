import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerekirse sadece React URL'ini yaz
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
headers = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"}

@app.post("/sor")
def sor(prompt: str):
    payload = {"inputs": prompt}
    response = requests.post(API_URL, headers=headers, json=payload)
    result = response.json()
    if isinstance(result, list):
        return {"cevap": result[0]["generated_text"]}
    return {"hata": result}
