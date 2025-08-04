from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = FastAPI()

# Load the pre-trained BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=3)

# Define a Pydantic model for user input
class Answer(BaseModel):
    text: str

# Endpoint for classifying answers
@app.post("/classify_answer/")
def classify_answer(answer: Answer):
    # Tokenize the user input
    inputs = tokenizer(answer.text, return_tensors="pt", padding=True, truncation=True)
    
    # Get model output
    outputs = model(**inputs)
    prediction = torch.argmax(outputs.logits, dim=-1).item()

    # Provide feedback based on the classification
    feedback = "Good Answer" if prediction == 0 else "Needs Improvement" if prediction == 1 else "Bad Answer"
    return {"feedback": feedback}

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Interview Assistant!"}
