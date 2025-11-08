import React, { useState } from "react";
import { Hash, Sparkles } from "lucide-react";
import Markdown from "react-markdown";
import BLOG_CATEGORIES from "../../data/blogCatagore";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import api from "../../api";
function Blog() {
  /* -------------------- State -------------------- */
  const [selectedCategory, setSelectedCategory] = useState(BLOG_CATEGORIES[0]);
  const [topic, setTopic] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [content, setContent] = useState(""); 
  const { getToken } = useAuth();

  /* -------------------- Handlers -------------------- */

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      toast.loading("Blog generation in progress...");

      const prompt = `Write a blog about ${topic} in category ${selectedCategory}`;

      const token = await getToken();
      const response = await api.post(
        "/api/ai/generate-blog",
        { prompt, category: selectedCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Blog API Response:", response.data);

      setContent(response.data.content || response.data.blog || ""); 
      setTopic(""); 

      toast.dismiss();
      toast.success("Blog generated successfully 🎉");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong in blog generation. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // ✅ stop loader properly
    }
  };

  /* -------------------- Render -------------------- */
  return (
    <>
      <div className="animated-bg"></div>

      <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-200 fade-in-up">
        {/* ---------------- Left Column (Form) ---------------- */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 rounded-xl border border-gray-300"
        >
          {/* Title */}
          <div className="flex gap-3 items-center fade-in-up fade-delay-1">
            <Sparkles className="w-5 text-[#e4920f]" />
            <h1 className="text-lg font-semibold">Blog Configuration</h1>
          </div>

          {/* Input: Blog Topic */}
          <p className="mt-6 text-sm font-semibold mb-2 fade-in-up fade-delay-2">
            Blog Topic
          </p>
          <input
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            type="text"
            placeholder="Write the topic of the blog"
            className="w-full py-3 px-3 outline-none text-sm rounded-md border border-gray-300 fade-in-up fade-delay-3"
          />

          {/* Select: Category */}
          <h3 className="mt-4 text-sm font-semibold fade-in-up fade-delay-4">
            Blog Category
          </h3>
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
            type="submit"
            disabled={loading || !topic}
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
            <span className="font-semibold">Generate Blog</span>
          </button>
        </form>

        {/* ---------------- Right Column (Generated Result) ---------------- */}
        <div className="w-full max-w-3xl p-4 rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px] ">
          {/* Title */}
          <div className="flex items-center gap-3 fade-in-up fade-delay-7">
            <Hash className="w-6 h-6 text-[#e4920f]" />
            <h1 className="text-xl font-semibold">Generated Blog</h1>
          </div>

          {/* Placeholder / Result */}
          <div className="flex-1 mt-3 overflow-y-auto fade-in-up fade-delay-8">
            {content && content.trim().length > 0 ? (
              <p className="text-sm whitespace-pre-line text-white"><Markdown>{content}</Markdown></p>
            ) : (
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Hash className="w-9 h-9 fade-in-up fade-delay-9" />
                <p>Enter a topic and click "Generate Blog" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
