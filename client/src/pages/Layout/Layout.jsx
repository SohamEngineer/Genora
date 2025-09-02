import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { Menu,  X } from 'lucide-react';
import Sideber from '../../components/core/sideber';
import { useUser,SignIn } from '@clerk/clerk-react';

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const {user}=useUser();

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-500'>
        <img 
          src={assets.logo} 
          className='w-32 sm:w-44 cursor-pointer' 
          onClick={() => navigate('/')} 
        /> 
        {sidebar ? (
          <X 
            className='w-6 h-6 text-white sm:hidden cursor-pointer' onClick={() => setSidebar(false)}/>
          
        ): <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-white sm:hidden cursor-pointer'/>}
      </nav>
        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sideber sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-black'>
      <Outlet />
        </div>
         </div>
    </div>
  ) :(
    <div className='flex justify-center items-center h-screen '>
      <SignIn/>
    </div>
  )
}

export default Layout
