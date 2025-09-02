import { PricingTable } from '@clerk/clerk-react'
import React from 'react'

function Plan() {
    const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
    <div className='text-center'>
        <h2 className='text-white text-[42px] font-semibold'> Choose Your Plan</h2>
        <p className='text-gray-200 max-w-lg mx-auto'> Start Free and scale up as your grow.Find the perfect plan for your content creation needs.</p>
    </div>
    <div className='mt-6'>
        <PricingTable 
  publishableKey={clerkKey}
  afterSelectPlanUrl="/dashboard"
  appearance={{
    variables: {
      colorPrimary: "#7B5FF1",   // gradient purple
      colorBackground: "#0D0D0D",
      colorText: "white",
      colorTextSecondary: "white",
      borderRadius: "12px",
      fontSize: "14px",
    },
    elements: {
      rootBox: "shadow-lg",
      planTitle: "text-lg font-bold text-white",
      planPrice: "text-2xl font-extrabold text-purple-400",
      planList: "text-gray-300",
      card: "p-10",
      planButton:
        "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90",
      
      // ✅ This controls the tick color
      planFeatureIcon: "text-green-400", 
    },
  }}
/>

    </div>
    </div>
  )
}

export default Plan