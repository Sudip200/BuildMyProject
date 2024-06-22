import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import Skills from "./skills";
const Card=({item,user}):ReactElement=>{

const router = useRouter();


return( 
  <div className="
  flex flex-col justify-center shadow-lg text-white border border-gray-800 rounded-lg
   p-6 mx-auto my-6 text-center  bg-gray-800 w-full " key={item.id}>
    <div className="flex items-center
    sm:flex-col gap-1 lg:flex-row  lg:justify-around" >
 
    <div><h2 className="text-3xl font-semibold mb-2 text-violet-400">{item.data.Title}</h2></div>
    <div>
      <p className="mt-2 text-gray-400">{item.data.uploadedBy}</p>
      <p className="text-gray-400">{item.data.Category}</p>
      <p className="text-gray-400 mb-4">{item.data.SubCategory}</p>
    </div>
    <div className="sm:justify-self-center lg:justify-self-end">
    <h1 className="text-2xl text-green-500 mb-4">₹{item.data.Budget}</h1>
    <button className="bg-violet-900 hover:bg-violet-950 text-white px-5 py-2 rounded-md font-bold transition-colors" onClick={() => {
      router.push({ pathname: '/projectdetails', query: { proid: item.id, uid: user.uid, clientid: item.data.uid } });
    }}>
      Apply
    </button>
  </div>
</div>
<div className="flex sm:justify-center lg:justify-start w-full mt-5">
    <Skills skills={item.data.Skills} />
  </div>
</div>

  )
}

export default Card