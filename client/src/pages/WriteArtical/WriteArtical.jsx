import { useAuth } from '@clerk/clerk-react';
import { Edit, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Markdown from "react-markdown";
import articleLength from '../../data/articleLength';
import api from '../../api';

function WriteArtical() {
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  // Reset article when component mounts (refresh)
  useEffect(() => {
    setContent('');
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      toast.loading('Generating your article...');

      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const token = await getToken();
      const response = await api.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('API Response:', response.data);

      setContent(response.data.content || response.data.article || '');
      setInput(''); // clear the input after submit

      toast.dismiss();
      toast.success('Article generated successfully 🎉');
    } catch (error) {
      toast.dismiss();
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Animated black gradient background */}
      <div className="animated-bg"></div>

      <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-light fade-in-up">
        {/* Left col */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 rounded-xl border border-gray-300"
        >
          <div className="flex gap-3 items-center">
            <Sparkles className="w-5 text-[#4A7AFF]" />
            <h1> Title Generator</h1>
          </div>

          <p className="mt-6 text-sm font-semibold mb-2">Article Topic</p>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="The future of artificial intelligence"
            className="w-full py-3 px-3 outline-none text-sm rounded-md border border-gray-300"
            required
          />

          <h3 className="mt-4 text-sm font-semibold">Article Length</h3>
          <div className="mt-3 flex gap-3 flex-wrap">
            {articleLength.map((item, idx) => (
              <span
                key={idx}
                onClick={() => setSelectedLength(item)}
                className={`text-sm border rounded-full px-4 py-2 cursor-pointer ${
                  selectedLength.text === item.text
                    ? 'bg-gradient-to-l from-[#FCE00D] via-[#097973] to-[#00D4FF] text-white'
                    : 'text-gray-500 border-gray-300'
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !input}
            className={`w-full flex justify-center items-center gap-2 
              bg-gradient-to-r from-[#FCE00D] via-[#097973] to-[#00D4FF] text-white 
              px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin " />
            ) : (
              <Edit className="w-5" />
            )}
            <span className="font-semibold">Generate article</span>
          </button>
        </form>

        {/* Right col */}
        <div className="w-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-full">
          <div className="flex items-center gap-3">
            <Edit className="w-6 h-6 text-[#4A7AFF]" />
            <h1 className="text-xl font-semibold">Generated Article</h1>
          </div>

          <div className="flex-1 mt-3 overflow-y-auto">
            {content && content.trim().length > 0 ? (
              <div className="text-sm whitespace-pre-line text-white">
              <Markdown>{content}</Markdown>
              </div>
            ) : (
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Edit className="w-9 h-9" />
                <p>Enter a topic and click "Generate article" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteArtical;
