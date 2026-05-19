SKILLS_DB = [
    "Python",
    "Java",
    "C++",
    "SQL",
    "FastAPI",
    "React",
    "Next.js",
    "TensorFlow",
    "Keras",
    "Machine Learning",
    "Deep Learning",
    "OpenCV",
    "Docker",
    "Git",
    "MongoDB",
    "PostgreSQL",
    "JavaScript",
    "TypeScript",
    "Node.js"
]

def extract_skills(text):

    found_skills = []

    text = text.lower()

    for skill in SKILLS_DB:
        if skill.lower() in text:
            found_skills.append(skill)

    return found_skills