from groq import Groq
from dotenv import load_dotenv

import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_resume_suggestions(
    resume_skills,
    missing_skills,
    ats_score
):

    prompt = f"""
    You are an expert ATS resume reviewer.

    Resume Skills:
    {resume_skills}

    Missing Skills:
    {missing_skills}

    ATS Score:
    {ats_score}

    Give:
    1. Resume improvement suggestions
    2. Skills to learn
    3. ATS optimization advice
    4. Better project wording ideas

    Keep response concise and professional.
    """

    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,
    )

    return completion.choices[0].message.content