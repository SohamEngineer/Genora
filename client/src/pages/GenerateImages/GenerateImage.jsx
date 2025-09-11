import React, { useState } from "react";
import { Image, Sparkles } from "lucide-react";

function GenerateImage() {
  /* -------------------- Constants -------------------- */
  const IMAGE_STYLES = [
    "Realistic",
    "Ghibli Style",
    "Anime Style",
    "Cartoon Style",
    "Fantasy Style",
    "3D Style",
    "Portrait style",
  ];

  /* -------------------- State -------------------- */
  const [selectStyle, setSelectStyle] = useState("Realistic"); // Selected image style
  const [input, setInput] = useState(""); // User prompt for image generation
  const [publish, setPublish] = useState(false); // Toggle: Make image public
  const [loading, setLoading] = useState(false); // Loader state

  /* -------------------- Handlers -------------------- */
  // Prevent form reload
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  // Simulated loading (for Generate Image button)
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  /* -------------------- Render -------------------- */
  return (
    <>
    {/* Animated black gradient background */}
      <div className="animated-bg"></div>
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-light fade-in-up">
      {/* ---------------- Left Column (Form) ---------------- */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4  rounded-xl border border-gray-300"
      >
        {/* Title */}
        <div className="flex gap-3 items-center fade-in-up fade-delay-1">
          <Sparkles className="w-5 text-[#e4920f]" />
          <h1 className="text-lg font-semibold">Image Generator</h1>
        </div>

        {/* Input: Image description */}
        <p className="mt-6 text-sm font-semibold mb-2 fade-in-up fade-delay-2">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          placeholder="Describe what you want to see in the image.."
          className="w-full py-3 px-3 outline-none text-sm rounded-md border border-gray-300 fade-in-up fade-delay-3"
        />

        {/* Select: Style */}
        <h3 className="mt-4 text-sm font-semibold fade-in-up fade-delay-4">Style</h3>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-full">
          {IMAGE_STYLES.map((item, idx) => (
            <span
              key={idx}
              onClick={() => setSelectStyle(item)}
              className={`text-sm border rounded-full px-4 py-2 cursor-pointer transition fade-in-up fade-delay-5
                ${
                  selectStyle === item
                    ? "bg-gradient-to-l from-[#e4920f] to-[#45FCA7] text-white"
                    : "text-gray-500 border-gray-300"
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Toggle: Publish */}
       <div className="my-6 flex items-center gap-2">
  <label className="relative cursor-pointer fade-in-up fade-delay-6">
    <input
      type="checkbox"
      onChange={(e) => setPublish(e.target.checked)}
      checked={publish}
      className="sr-only peer"
    />
    {/* Track */}
    <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
    {/* Knob */}
    <span
      className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition 
        peer-checked:translate-x-4 peer-checked:bg-white"
    ></span>
  </label>
  <p className="text-sm fade-in-up fade-delay-7">Make this image public</p>
</div>


        {/* Submit Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 
            bg-gradient-to-r from-[#FD1D1D] to-[#45FCA7] text-white 
            px-4 py-2 text-sm rounded-lg cursor-pointer disabled:opacity-70 fade-in-up fade-delay-8"
        >
          {/* Loader or Icon */}
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Image className="w-5" />
          )}
          <span className="font-semibold">Generate Image</span>
        </button>
      </form>

      {/* ---------------- Right Column (Output Preview) ---------------- */}
      <div className="w-full max-w-lg p-4  rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px]">
        {/* Title */}
        <div className="flex items-center gap-3 fade-in-up fade-delay-6">
          <Image className="w-6 h-6 text-[#e4920f]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        {/* Placeholder / Result */}
        <div className="flex-1 flex justify-center items-center ">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400 fade-in-up fade-delay-9">
            <Image className="w-9 h-9" />
            <p>Describe an image and click "Generate Image" to get started</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default GenerateImage;
