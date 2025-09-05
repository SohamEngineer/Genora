import React, { useState } from 'react'
import {  Hash, Sparkles } from 'lucide-react';
function GenerateImage() {
 const blogGenerator=['General','Technology','Business','Health','Lifestyle','Education','Travel','Food']
    const [selectedTitle, setSelectedTitle]=useState(blogGenerator[0]);
    const [input,setInput]=useState('');
    const onSubmitHandler=async(e)=>{
      e.preventDefault();
    }
    
    
    const [loading, setLoading] = useState(false);
  
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-salte-800'>
      {/* left col */}
      <form   onSubmit={onSubmitHandler} className='w-full  max-w-lg p-4 bg-white rounded-xl border border-gray-300'>
        <div className='flex gap-3 items-center '>
          <Sparkles className='w-5 text-[#e4920f] ' />
          <h1> Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-semibold mb-2'>Artical Topic</p>
        <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder="Write the topic of the artical" className='w-full py-3 px-3 outline-none text-sm rounded-md border border-gray-300'>

        </input>
        <h3 className='mt-4 text-sm font-semibold'>Article Title</h3>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-full'>
          {blogGenerator.map((item,idx)=>(
            <span onClick={()=>setSelectedTitle(item)}  className={`text-sm border rounded-full px-4 py-2 cursor-pointer ${selectedTitle===item?'bg-blue-50 bg-gradient-to-l from-[#e4920f] to-[#45FCA7] text-white':'text-gray-500 border-gray-300'}`} key={idx}>{item}</span>
          ))}
        </div>
        <br/>

      <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full flex justify-center items-center gap-2 
        bg-gradient-to-r from-[#FD1D1D] to-[#45FCA7] text-white 
        px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer 
        `}
    >
      {/* Left Loader */}
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin " />
      ):( <Hash className="w-5" />)}
      {/* Button Text */}
      <span className='font-semibold'>Generate article</span>

    </button>
      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px]'>
      <div className='flex items-center gap-3'>
        <Hash className='w-6 h-6 text-[#e4920f]'/>
        <h1 className='text-xl font-semibold'>Generated Article</h1>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
          <Hash className='w-9 h-9 '/>
          <p>Enter keywords and click "Generate Titles" to get started</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default GenerateImage