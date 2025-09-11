import React from 'react'
import { AiToolsData } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { CardSpotlight } from '../Spotlight';

const AiTool = () => {
    const navigate=useNavigate();
const{user}=useUser();
  return (
    <div className='min-h-screen px-4 sm:px-20 xl:px-32 py-14  '>
        <div className='text-center'>
            <h2 className='text-white text-[42px] font-semibold'>Powerful AI Tools</h2>
            <p className='text-gray-300 max-w-lg mx-auto'>Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.</p>
            
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
  {AiToolsData.map((tool, index) => (
    <CardSpotlight
      key={index}
      className="w-full cursor-pointer "
      onClick={() => user && navigate(tool.path)}
    >
      <tool.Icon
        className="w-12 h-12 p-3 text-black rounded-xl relative"
        style={{
          background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
        }}
      />
      <h2 className="text-xl font-bold mt-6 text-white relative ">
        {tool.title}
      </h2>
      <p className="text-gray-200 text-sm max-w-[90%] relative">
        {tool.description}
      </p>
    </CardSpotlight>
  ))}
</div>


    </div>
  )
}

export default AiTool