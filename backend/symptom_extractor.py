import json
import os
import requests
from prompts import SYSTEM_PROMPT

# Set your OpenRouter API key (better via env variable)
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "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")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# Map severity words to numeric values
SEVERITY_MAP = {
    "mild": 3,
    "moderate": 5,
    "severe": 7,
    "intense": 8,
    "very severe": 10,
    "gone":0,
    "piercing": 9,
    "almost gone": 2
}


def extract_symptoms(user_text: str):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "gpt-3.5-turbo",
        "temperature": 0,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_text}
        ]
    }

    try:
        response = requests.post(OPENROUTER_URL, headers=headers, json=payload)
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]

        try:
            data = json.loads(content)

            # Convert severity to number correctly
            for symptom in data.get("symptoms", []):
                sev = symptom.get("severity")

                if sev is None:
                    symptom["severity"] = 5  # default fallback
                elif isinstance(sev, str):
                    if sev.isdigit():  # numeric string
                        symptom["severity"] = int(sev)
                    else:  # word mapping
                        symptom["severity"] = SEVERITY_MAP.get(sev.lower(), 5)
                else:  # already a number
                    symptom["severity"] = sev

            return data

        except json.JSONDecodeError:
            return {"symptoms": []}

    except requests.exceptions.RequestException as e:
        print("OpenRouter API error:", e)
        return {"symptoms": []}