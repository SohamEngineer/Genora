import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../../assets/assets';
import { Gem, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../../components/core/creationItem';

function Dashboarde() {
  const [creations,setCreations]=useState([]);
  const getDashboardData=async()=>{
    setCreations(dummyCreationData);
  }
  useEffect(()=>{
getDashboardData();
  },[])

  return (
    <div className=' w-full h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
      {/* TOtal Creation Card */}
        <div className='flex justify-between items-center w-72 p-6 px-6  bg-white rounded xl border border-gray-300'>
          <div >
            <p className='text-sm text-black font-semibold'>Total Creations</p>
            <h2  className='text-xl text-center font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white '/>
          </div>
        </div>
        {/* Active Plan Card */}
         <div className='flex justify-between items-center w-72 p-6 px-6  bg-white rounded xl border border-gray-300'>
          <div >
            <p className='text-sm text-black font-semibold'>Active Plan</p>
            <h2  className='text-xl text-center font-semibold'>
               <Protect plan='premium' fallback="Free  " >Premium </Protect>
                  Plan
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#f2a335] to-[#850bd7] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white '/>
          </div>
        </div>
      </div>
{/* Recent Creation */}
<div className='space-y-3'>
  <p className='mt-6 mb-4 text-white font-semibold'>Recent Creations</p>
  {
    creations.map((item)=><CreationItem key={item.id} item={item}/>)
  }
</div>

    </div>
  )
}

export default Dashboarde