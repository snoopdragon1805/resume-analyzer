from fastapi import FastAPI, UploadFile, File, Form
from utils.skill_extractor import extract_skills
from scoring.ats_score import calculate_ats_score
from fastapi.middleware.cors import CORSMiddleware
#from ai.suggestions import generate_resume_suggestions
import fitz
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    # Save uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Extract text from PDF
    doc = fitz.open(file_path)

    extracted_text = ""

    for page in doc:
        extracted_text += page.get_text()

    doc.close()

    # Extract resume skills
    resume_skills = extract_skills(extracted_text)

    # Extract JD skills
    jd_skills = extract_skills(job_description)

    # Calculate ATS score
    ats_result = calculate_ats_score(resume_skills,jd_skills)

    #suggestions = generate_resume_suggestions(extracted_text,job_description,ats_result)

    return {
    "filename": file.filename,
    "resume_skills": resume_skills,
    "jd_skills": jd_skills,
    "ats_analysis": ats_result,
    #"ai_suggestions": suggestions
    }