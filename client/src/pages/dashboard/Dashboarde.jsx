import React, { useEffect, useState } from 'react'
// import { dummyCreationData } from '../../assets/assets';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import Accordino from '../../components/core/creationItem';
import toast from 'react-hot-toast';
import api from '../../api';
function Dashboarde() {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth();

  useEffect(() => {
    const getDashboardData = async () => {
      setLoading(true);
      toast.loading("Generating Creations");

      try {
        const token = await getToken();
        const { data } = await api.get("/api/user/getuserCreation", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data.creations);
        
        toast.dismiss()
        if (data.success) setCreations(data.creations);
      } catch (error) {
        toast.error("somthing error in the api", error);
      } finally {
        setLoading(false)
      }
    };

    getDashboardData();
  }, [])
  return (
    <>
      {/* Animated black gradient background */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-15 h-15 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        // Dashboard content with fade-in animation
        <div className='w-full h-full overflow-y-scroll p-6 text-white fade-in-up' style={{ position: 'relative', zIndex: 1 }}>
          <div className='flex justify-start gap-4  flex-col md:flex-row'>
            {/* Total Creation Card */}
            <div className='flex justify-between items-center w-72 p-6 px-6 rounded-xl border border-gray-300 bg-black bg-opacity-40 backdrop-blur-sm'>
              <div>
                <p className='text-sm font-semibold'>Total Creations</p>
                <h2 className='text-xl text-center font-semibold'>{creations.length}</h2>
              </div>
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
                <Sparkles className='w-5 text-white' />
              </div>
            </div>

            {/* Active Plan Card */}
            <div className='flex justify-between items-center w-72 p-6 px-6 rounded-xl border border-gray-300 bg-black bg-opacity-40 backdrop-blur-sm'>
              <div>
                <p className='text-sm font-semibold'>Active Plan</p>
                <h2 className='text-xl text-center font-semibold'>
                  <Protect plan='subscription' fallback="Free ">Premium </Protect> Plan
                </h2>
              </div>
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#f2a335] to-[#850bd7] text-white flex justify-center items-center'>
                <Gem className='w-5 text-white' />
              </div>
            </div>
          </div>

          {/* Recent Creations */}
          <div className='space-y-3 mt-6'>
            <p className='text-white font-semibold'>Recent Creations</p>
            {
              creations.map((item, index) => (
                <Accordino
                  key={item.id}
                  item={item}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                  className="fade-in-up shrink"
                />
              ))
            }
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboarde;
