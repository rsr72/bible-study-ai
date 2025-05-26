from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date, timedelta
from pydantic import BaseModel
import json
import os

from dotenv import load_dotenv
from app.services.ai import generate_insight

load_dotenv()

print("🔑 ENV Loaded: ", os.getenv("OPENAI_API_KEY"))

app = FastAPI(title="Bible Study AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load reading plan JSON
READINGS_PATH = os.path.join(os.path.dirname(__file__), "readings.json")

with open(READINGS_PATH, "r") as file:
    READING_PLAN = json.load(file)


@app.get("/reading/today")
def get_today_reading():
    today = str(date.today())
    reading = READING_PLAN.get(today, {
        "title": "No reading assigned",
        "text": "",
        "summary": "No reading is available for today. Check back tomorrow!"
    })
    return {
        "date": today,
        "reading": reading
    }


@app.get("/reading/tomorrow")
def get_tomorrow_reading():
    tomorrow = str(date.today() + timedelta(days=1))
    reading = READING_PLAN.get(tomorrow, {
        "title": "No reading assigned",
        "text": "",
        "summary": "No reading is available for tomorrow."
    })
    return {
        "date": tomorrow,
        "reading": reading
    }


# AI Insight Request Schema
class ReadingRequest(BaseModel):
    title: str
    text: str


@app.post("/insight")
def get_ai_insight(data: ReadingRequest):
    return generate_insight(data.title, data.text)
