import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { dummyPublishedCreationData } from '../../assets/assets';
import { Heart } from 'lucide-react';

function Community() {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreation = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreation();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6 text-white">
      <h2 className="text-xl font-semibold">Creations</h2>

      <div className="h-full w-full rounded-xl overflow-y-scroll grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden"
          >
            <img
              src={creation.content}
              alt={`creation-${index}`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-3 
              bg-gradient-to-t from-black/80 via-black/20 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              
              <p className="text-sm text-gray-200 mb-2">{creation.prompt}</p>

              <div className="flex gap-1 items-end">
                <p className="text-sm">{creation.likes.length}</p>
                <Heart
                  className={`w-5 h-5 cursor-pointer transition-transform duration-200 hover:scale-110 
                    ${creation.likes.includes(user?.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-white'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
