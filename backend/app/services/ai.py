import os
from dotenv import load_dotenv
load_dotenv()  # ✅ Load here instead of main.py

from openai import OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_insight(title: str, text: str) -> dict:
    prompt = f"""
You are a helpful Bible teacher. Given the passage titled "{title}", here is the content:

{text}

Please respond with the following:
1. A simple summary of what this passage is about
2. A short prayer based on the message
3. A practical life application (one or two sentences)
"""

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=500
    )

    return {"insight": response.choices[0].message.content}
