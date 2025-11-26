import React, { useEffect, useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";
import api from "../../api";

function ReviewResume() {
  // State for storing uploaded file
  const [input, setInput] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  useEffect(() => {
    setContent("");
  }, [])
  // Handle form submit (prevent reload for now)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;

    try {
      setLoading(true);
      toast.loading("Analyzing your resume...");
      
      const formData = new FormData();
      formData.append('resume', input);

   const token = await getToken();

      const response = await api.post(
        "/api/ai/resume-review",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Full Axios response:", response);

      toast.dismiss();

      if (response.data.success) {
        setContent(response.data.content);

        setInput(null);
        toast.success("Resume Review Successfully 🎉");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* Animated black gradient background */}
      <div className="animated-bg"></div>

      <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-light">
        {/* ---------- LEFT COLUMN (Upload Form) ---------- */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 rounded-xl border border-gray-300 fade-in-up fade-delay-1"
        >
          {/* Header */}
          <div className="flex gap-3 items-center fade-in-up fade-delay-2">
            <Sparkles className="w-5 text-[#e4920f]" />
            <h1 className="text-lg font-semibold">Resume Review</h1>
          </div>

          {/* File Upload */}
          <p className="mt-6 text-sm font-semibold mb-2 fade-in-up fade-delay-3">
            Upload Resume
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setInput(e.target.files[0])}
            className="w-full py-3 px-3 outline-none text-sm rounded-md 
            border border-gray-300 cursor-pointer text-gray-600 fade-in-up fade-delay-4"
          />
          <label className="text-xs text-gray-500 fade-in-up fade-delay-5">
            Supports PDF, PNG, JPG formats
          </label>

          {/* Action Button */}
          <button

            disabled={loading}
            className="w-full flex justify-center items-center gap-2 
            bg-gradient-to-r from-[#FD1D1D] to-[#45FCA7] text-white 
            px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer fade-in-up fade-delay-6"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileText className="w-5" />
            )}
            <span className="font-semibold">Review Resume</span>
          </button>
        </form>

        {/* ---------- RIGHT COLUMN (Output Preview) ---------- */}
        <div className="w-full max-w-2xl p-4 rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px] fade-in-up fade-delay-7">
          {/* Header */}
          <div className="flex items-center gap-3 fade-in-up fade-delay-8">
            <FileText className="w-6 h-6 text-[#e4920f]" />
            <h1 className="text-xl font-semibold">Analysis Results</h1>
          </div>
            {
              !content ?
              (<div className="flex-1 flex justify-center items-center fade-in-up fade-delay-9">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="w-9 h-9" />
              <p>Upload your resume and click "Review Resume" to get started</p>
            </div>
          </div>)
              :
              (
                 <p className="text-sm  h-full text-white overflow-y-scroll">
                 <Markdown>{content}</Markdown></p>
              )
                          }
          
          
        </div>
      </div>
    </>
  );
}

export default ReviewResume;
