import React, { useState } from "react";
import { Hash, Sparkles } from "lucide-react";
import BLOG_CATEGORIES from "../../data/blogCatagore";

function Blog() {


  /* -------------------- State -------------------- */
  const [selectedCategory, setSelectedCategory] = useState(BLOG_CATEGORIES[0]); // Selected blog category
  const [topic, setTopic] = useState(""); // User topic input
  const [loading, setLoading] = useState(false); // Loader state

  /* -------------------- Handlers -------------------- */
  // Prevents form refresh
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  // Simulated async action (like calling API)
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  /* -------------------- Render -------------------- */
  return (
    <>
          <div className="animated-bg"></div>

    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-200 fade-in-up">
      {/* ---------------- Left Column (Form) ---------------- */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4  rounded-xl border border-gray-300"
      >
        {/* Title */}
        <div className="flex gap-3 items-center fade-in-up fade-delay-1">
          <Sparkles className="w-5 text-[#e4920f]" />
          <h1 className="text-lg font-semibold">Article Configuration</h1>
        </div>

        {/* Input: Article Topic */}
        <p className="mt-6 text-sm font-semibold mb-2 fade-in-up fade-delay-2">Article Topic</p>
        <input
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
          type="text"
          placeholder="Write the topic of the article"
          className="w-full py-3 px-3 outline-none text-sm rounded-md border border-gray-300 fade-in-up fade-delay-3"
        />

        {/* Select: Category */}
        <h3 className="mt-4 text-sm font-semibold fade-in-up fade-delay-4">Article Category</h3>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-full">
          {BLOG_CATEGORIES.map((item, idx) => (
            <span
              key={idx}
              onClick={() => setSelectedCategory(item)}
              className={`text-sm border rounded-full px-4 py-2 cursor-pointer transition fade-in-up fade-delay-5
                ${
                  selectedCategory === item
                    ? "bg-gradient-to-l from-[#e4920f] to-[#45FCA7] text-white"
                    : "text-gray-500 border-gray-300"
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 
            bg-gradient-to-r from-[#FD1D1D] to-[#45FCA7] text-white 
            px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-70 fade-in-up fade-delay-6"
        >
          {/* Loader or Icon */}
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Hash className="w-5" />
          )}
          <span className="font-semibold">Generate Article</span>
        </button>
      </form>

      {/* ---------------- Right Column (Generated Result) ---------------- */}
      <div className="w-full max-w-lg p-4  rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px] ">
        {/* Title */}
        <div className="flex items-center gap-3 fade-in-up fade-delay-7">
          <Hash className="w-6 h-6 text-[#e4920f]" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>

        {/* Placeholder / Result */}
        <div className="flex-1 flex justify-center items-center fade-in-up fade-delay-8">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="w-9 h-9 fade-in-up fade-delay-9" />
            <p>Enter a topic and click "Generate Article" to get started</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Blog;
