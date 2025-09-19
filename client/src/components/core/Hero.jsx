import React from 'react';
import { AnimatedTooltip } from '../groupuser';
import { Boxes } from '../Boxes'; // <- import Boxes
import { TypewriterEffectSmooth } from '../TypewriterText';
import {useNavigate} from "react-router-dom";




const Hero = ({people,words}) => {
  const navigate=useNavigate();
  return (
    <div
      className="relative min-h-screen px-4 sm:px-20 xl:px-32 flex flex-col items-center justify-center overflow-hidden "

    >
      {/* Background Boxes */}
      <Boxes />
      

      {/* Content on top of background */}
      <div className="relative text-center mb-6">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold mx-auto leading-[1.2] text-white">
          {/* Create amazing content with <span className="text-primary">AI tools</span> */}
          <TypewriterEffectSmooth words={words} />
        </h1>
        <p className="text-white mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs">
          Transform your content creation with our suite of premium AI tools. Write articles,
          generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className="relative  flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs mb-8">
        <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500 cursor-pointer" onClick={() => navigate("/ai")}    >
        
        Start Creating New
      </button>
        <button className="p-[3px] relative group cursor-pointer">
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg transition-opacity duration-300 group-hover:opacity-100 opacity-80" />
  <div className="px-8 py-2 bg-black text-white rounded-[6px] relative  group-hover:bg-transparent transition duration-200 font-bold">
    Watch Demo
  </div>
</button>
      </div>

      {/* Avatar Tooltip */}
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={people} /><p className='text-gray-300 ml-5 relative right-0'>Trusted by 10k+ people</p>
      </div>
    </div>
  );
};

export default Hero;
