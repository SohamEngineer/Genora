import React, { useEffect, useState } from 'react'
import { Eraser, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

function RemoveBackground() {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(""); // Generated image URL

  const { getToken } = useAuth();

  useEffect(() => {
    setContent("");
  }, []);
  const onSubmitHandler = async (e) => {
  e.preventDefault();
  if (!input) return;

  try {
    setLoading(true);
    toast.loading("Generating image...");

    const formData = new FormData();
    formData.append('image', input);

    const token = await getToken();

    const response = await axios.post(
      "/api/ai/remove-image-background",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
console.log("Full Axios response:", response);

    toast.dismiss();

    if (response.data.success) {
      setContent(response.data.content);
      setInput(null);
      toast.success("Background removed successfully 🎉");
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
      <div className="animated-bg"></div>
      <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-light fade-in-up ">
        {/* LEFT COLUMN (Upload Form) */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 rounded-xl border border-gray-300"
        >
          <div className="flex gap-3 items-center fade-in-up fade-delay-1">
            <Sparkles className="w-5 text-[#e4920f]" />
            <h1 className="text-lg font-semibold">Background Removal</h1>
          </div>

          <p className="mt-6 text-sm font-semibold mb-2 fade-in-up fade-delay-2">Upload Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setInput(e.target.files[0])}
            className="w-full py-3 px-3 outline-none text-sm rounded-md border border-gray-300 cursor-pointer text-gray-600 fade-in-up fade-delay-3"
          />
          <label className="text-xs text-gray-500 fade-in-up fade-delay-4">
            Supports JPG, PNG, and other image formats
          </label>

          <button
            type="submit"
            disabled={loading || !input}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#FD1D1D] to-[#45FCA7] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer fade-in-up fade-delay-5 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Eraser className="w-5" />
            )}
            <span className="font-semibold">Remove Background</span>
          </button>
        </form>

        {/* RIGHT COLUMN (Output Preview) */}
        <div className="w-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px]">
          <div className="flex items-center gap-3 fade-in-up fade-delay-8">
            <Eraser className="w-6 h-6 text-[#e4920f]" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>

          <div className="flex-1 flex justify-center items-center fade-in-up fade-delay-9">
            {content ? (
              <img
                src={content}
                alt="Processed"
                className="max-h-[500px] max-w-full object-contain rounded-lg shadow-md"
              />
            ) : (
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Eraser className="w-9 h-9" />
                <p>Upload an image and click "Remove Background" to get started</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default RemoveBackground
