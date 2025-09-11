import React, { useState } from 'react'
import { Eraser, Sparkles } from 'lucide-react'

function RemoveBackground() {
  // State for storing uploaded file
  const [input, setInput] = useState(null);

  // State for loading spinner
  const [loading, setLoading] = useState(false);

  // Handle form submit (prevent reload for now)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Future: API call for background removal
  }

  // Simulate async background removal action
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
    {/* Animated black gradient background */}
      <div className="animated-bg"></div>
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-light fade-in-up ">
      {/* ---------- LEFT COLUMN (Upload Form) ---------- */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4  rounded-xl border border-gray-300"
      >
        {/* Header */}
        <div className="flex gap-3 items-center fade-in-up fade-delay-1">
          <Sparkles className="w-5 text-[#e4920f]" />
          <h1 className="text-lg font-semibold">Background Removal</h1>
        </div>

        {/* File Upload */}
        <p className="mt-6 text-sm font-semibold mb-2 fade-in-up fade-delay-2">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setInput(e.target.files[0])}
          className="w-full py-3 px-3 outline-none text-sm rounded-md 
          border border-gray-300 cursor-pointer text-gray-600 fade-in-up fade-delay-3"
        />
        <label className="text-xs text-gray-500 fade-in-up fade-delay-4">
          Supports JPG, PNG, and other image formats
        </label>

        {/* Action Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 
          bg-gradient-to-r from-[#FD1D1D] to-[#45FCA7] text-white 
          px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer fade-in-up fade-delay-5"
        >
          {/* Show loader while processing */}
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin fade-in-up fade-delay-6" />
          ) : (
            <Eraser className="w-5" />
          )}
          <span className="font-semibold fade-in-up fade-delay-7">Remove Background</span>
        </button>
      </form>

      {/* ---------- RIGHT COLUMN (Output Preview) ---------- */}
      <div className="w-full max-w-lg p-4  rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px]">
        {/* Header */}
        <div className="flex items-center gap-3 fade-in-up fade-delay-8">
          <Eraser className="w-6 h-6 text-[#e4920f]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {/* Placeholder when no image is processed */}
        <div className="flex-1 flex justify-center items-center fade-in-up fade-delay-9">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Eraser className="w-9 h-9" />
            <p>Upload an image and click "Remove Background" to get started</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default RemoveBackground
