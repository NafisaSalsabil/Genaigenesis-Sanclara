from fastapi import FastAPI
from pydantic import BaseModel
from symptom_extractor import extract_symptoms
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomInput(BaseModel):
    text: str


@app.get("/")
def root():
    return {"message": "Symptom Extraction API running"}


@app.post("/analyze")
def analyze_symptoms(input: SymptomInput):

    result = extract_symptoms(input.text)

    return result
