import React from "react";
import { CardSpotlight } from "./Spotlight";

const StarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
      fill="#FF532E"
    />
  </svg>
);

export const Testimonial = ({ testimonials }) => {
  return (
    <div className=" min-h-screen px-4 sm:px-20 xl:px-32 ">
      <div className="text-center">
        <h2 className="text-white text-[42px] font-semibold">
          Loved by Creators
        </h2>
        <p className="text-gray-200 max-w-lg mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-20 ">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="w-full border border-gray-700 pb-6 rounded-lg  shadow-black/5 mt-10 relative"
          >
            {/* ✅ Spotlight added */}
            <CardSpotlight className="absolute inset-0 " />

            <div className="flex flex-col items-center px-5 py-4  ">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full object-cover"
                src={t.src}
                alt={t.name}
              />
              <div className="pt-8 text-center ">
                <h1 className="text-lg font-medium text-gray-300">{t.name}</h1>
                <p className="text-gray-300">{t.designation}</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center ">{t.quote}</p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
