"use client";

import { useState } from "react";

export default function Home() {

  const [file, setFile] = useState<File | null>(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!file) {
      alert("Please upload a resume");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "job_description",
      jobDescription
    );
    

    try {

      const response = await fetch(
        "https://resume-analyzer-6hpf.onrender.com/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {

      console.error(error);

      alert("Error connecting to backend");

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800 p-10 text-white">

      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl">

        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          AI Resume Analyzer

        </h1>

        {/* Upload Section */}
        <div className="mb-8">

          <label className="block mb-3 text-lg font-semibold">

            Upload Resume

          </label>

          <input
            type="file"
            accept=".pdf"
            className="w-full bg-black/30 border border-gray-700 p-4 rounded-xl cursor-pointer"
            onChange={(e) => {

              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />

        </div>

        {/* Job Description */}
        <div className="mb-8">

          <label className="block mb-3 text-lg font-semibold">

            Job Description

          </label>

          <textarea
            rows={8}
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            className="w-full bg-black/30 border border-gray-700 p-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
        >

          {loading
            ? "Analyzing..."
            : "Analyze Resume"}

        </button>

        {/* Results */}
        {result && (

          <div className="mt-12">

            {/* ATS Score */}
            <div className="bg-black/30 border border-cyan-400/30 rounded-2xl p-8 mb-8 text-center">

              <h2 className="text-2xl font-semibold mb-3">

                ATS Score

              </h2>

              <p className="text-6xl font-extrabold text-cyan-400">

                {result.ats_analysis.ats_score}%

              </p>

            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Matched Skills */}
              <div className="bg-black/30 border border-green-400/20 rounded-2xl p-6">

                <h3 className="text-2xl font-bold mb-5 text-green-400">

                  Matched Skills

                </h3>

                <div className="flex flex-wrap gap-3">

                  {result.ats_analysis.matched_skills.map(
                    (skill: string) => (

                      <span
                        key={skill}
                        className="bg-green-500/20 border border-green-400 text-green-300 px-4 py-2 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

              {/* Missing Skills */}
              <div className="bg-black/30 border border-red-400/20 rounded-2xl p-6">

                <h3 className="text-2xl font-bold mb-5 text-red-400">

                  Missing Skills

                </h3>

                <div className="flex flex-wrap gap-3">

                  {result.ats_analysis.missing_skills.map(
                    (skill: string) => (

                      <span
                        key={skill}
                        className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-2 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* Resume Skills */}
            <div className="bg-black/30 border border-blue-400/20 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold mb-5 text-blue-400">

                Resume Skills

              </h3>

              <div className="flex flex-wrap gap-3">

                {result.resume_skills.map(
                  (skill: string) => (

                    <span
                      key={skill}
                      className="bg-blue-500/20 border border-blue-400 text-blue-300 px-4 py-2 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}