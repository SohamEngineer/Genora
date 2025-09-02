import React from 'react';
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItem = [
  { to: "/ai", label: 'Dashboard', icon: House },
  { to: "/ai/write-article", label: 'Write Article', icon: SquarePen },
  { to: "/ai/blog-titles", label: 'Blog Titles', icon: Hash },
  { to: "/ai/generate-images", label: 'Generate Images', icon: Image },
  { to: "/ai/remove-background", label: 'Remove Background', icon: Eraser },
  { to: "/ai/remove-object", label: 'Remove Object', icon: Scissors },
  { to: "/ai/review-resume", label: 'Review Resume', icon: FileText },
  { to: "/ai/community", label: 'Community', icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-70 bg-black border-r shadow-xl border-gray-600 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0  text-white
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
      transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt="profile"
          className="w-14 h-14 rounded-full mx-auto object-cover"
        />
        <h1 className="mt-1 text-center text-white">{user?.fullName}</h1>

        <div className="mt-6 flex flex-col gap-1 px-4 text-lg font-semibold">
          {navItem.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded text-gray-300 hover:text-white 
                ${isActive ? "bg-gradient-to-r from-[#3c81F6] to-[#9234EA] text-white" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 font-semibold text-xl ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className='w-full border-t border-white p-4 px-7 flex item-center justify-between'>
          <div className='flex gap-2 items-center cursor-pointer' onClick={openUserProfile}>
            <img src={user.imageUrl} className='w-8 rounded-full'/>
            <div>
              <h1 className=' text-lg font-semibold'>{user.fullName}</h1>
              <p className='text-xs text-gray-300'>
                <Protect plan='premium' fallback="Free  " >Premium </Protect>
                  Plan
              </p>
            </div>
          </div>
    <LogOut onClick={signOut} className='w-4.5 text-white hover:text-gray-700 transition cursor-pointer'/>
      </div>

    </div>
  );
};

export default Sidebar;
