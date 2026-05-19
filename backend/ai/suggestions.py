import google.generativeai as genai

# Configure Gemini
genai.configure(api_key="AIzaSyDvLRCBNjwdYRH37X7P-rTUynOl0lFn42Q")

model = genai.GenerativeModel("gemini-2.0-flash")

def generate_resume_suggestions(
    resume_text,
    job_description,
    ats_analysis
):

    prompt = f"""
    You are an ATS resume optimization assistant.

    Analyze the following resume and job description.

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    ATS Analysis:
    {ats_analysis}

    Give:
    1. Missing technical skills
    2. Resume improvement suggestions
    3. ATS optimization tips
    4. Better project wording suggestions

    Keep response concise and professional.
    """

    response = model.generate_content(prompt)

    return response.text