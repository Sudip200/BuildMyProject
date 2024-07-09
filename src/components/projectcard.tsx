import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import Skills from "./skills";
const Card=({item,user}):ReactElement=>{

const router = useRouter();


return (
  <div className="flex flex-col justify-center shadow-lg text-white border border-gray-800 rounded-lg p-5 mx-auto my-6 text-center bg-gradient-to-bl lg:w-full sm:h-32" key={item.id}>
  <div className="flex  flex-row justify-between items-center gap-1 ">
    <div className="flex flex-col lg:items-center sm:items-start lg:w-1/3 space-y-4">
      <h2 className="text-[min(4vw,1.4rem)] font-semibold mb-1 text-violet-400 truncate">{item.data.Title}</h2>
      <div className="flex justify-center lg:justify-start sm:items-start">
    <Skills skills={item.data.Skills} />
  </div>
    </div>
    <div className="flex flex-col items-start lg:items-center lg:block lg:w-1/3 sm:hidden">
      <p className="mt-1 text-gray-400 truncate">{item.data.uploadedBy}</p>
      <p className="text-gray-400 truncate">{item.data.Category}</p>
      <p className="text-gray-400 truncate">{item.data.SubCategory}</p>
    </div>
    <div className="flex flex-col items-center lg:w-1/3">
      <h1 className="text-[min(4vw,1.3rem)] text-green-500 mb-2">₹{item.data.Budget}</h1>
      <button
        className="bg-violet-900 hover:bg-violet-950 text-white px-9 py-4 sm:px-6 sm:py-3 rounded-md font-bold transition-colors text-sm"
        onClick={() => {
          router.push({ pathname: '/projectdetails', query: { proid: item.id, uid: user.uid, clientid: item.data.uid } });
        }}
      >
        Apply
      </button>
    </div>
  </div>
 
</div>

);
}

export default Card