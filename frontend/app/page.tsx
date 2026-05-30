"use client";

import { useDropzone } from "react-dropzone";

import {
  UploadCloud,
  FileText,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import { useState } from "react";

export default function Home() {

  const [file, setFile] = useState<File | null>(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    });

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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl"
      >
        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          AI Resume Analyzer

        </h1>

        {/* Upload Section */}
        <div className="mb-8">

          <label className="block mb-3 text-lg font-semibold">

            Upload Resume

          </label>

          <div
            {...getRootProps()}
            className="border-2 border-dashed border-cyan-400/40 rounded-2xl p-10 text-center bg-black/20 hover:bg-black/30 transition-all duration-300 cursor-pointer"
          >

            <input {...getInputProps()} />

            <UploadCloud
              className="mx-auto mb-4 text-cyan-400"
              size={60}
            />

            <p className="text-lg font-medium mb-2">

              Drag & Drop Resume PDF

            </p>

            <p className="text-gray-400 text-sm">

              or click to browse files

            </p>

            {file && (

              <div className="mt-6 flex items-center justify-center gap-2 text-green-400">

                <FileText size={20} />

                <span>{file.name}</span>

              </div>
            )}

          </div>

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

          {loading ? (
            <div className="flex items-center justify-center gap-3">

              <Sparkles className="animate-pulse" />

              <span>
                AI is analyzing your resume...
              </span>

            </div>
          ) : (
            "Analyze Resume"
          )}

        </button>

        {/* Results */}
        {result && (

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            {/* ATS Score */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-semibold mb-3">

                ATS Score

              </h2>

              <p className="text-6xl font-extrabold text-cyan-400">

                {result.ats_analysis.ats_score}%

              </p>

            </motion.div>

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

            {/* AI Suggestions */}
            <div className="bg-black/30 border border-purple-400/20 rounded-2xl p-6 mt-8">

              <h3 className="text-2xl font-bold mb-5 text-purple-400">

                AI Suggestions

              </h3>

              <div className="text-gray-300 whitespace-pre-wrap leading-7">

                {result.ai_suggestions}

              </div>

            </div>

          </motion.div>
        )}

      </motion.div>

    </main>
  );
}