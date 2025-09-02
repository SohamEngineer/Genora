import { useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react';
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
      className={`w-60 bg-black border-r shadow-xl border-gray-600 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 
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

        <div className="mt-6 flex flex-col gap-1">
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
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
