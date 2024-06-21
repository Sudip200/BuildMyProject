import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import Skills from "./skills";
const Card=({item,user}):ReactElement=>{

const router = useRouter();


return( <div className="shadow-lg text-white  border border-gray-700 rounded-lg p-6 max-w-md mx-auto my-6 text-center transition transform hover:scale-105 hover:shadow-xl" key={item.id}>
    <h2 className="text-3xl font-semibold mb-2 text-violet-400">{item.data.Title}</h2>
    {/* <p>{item.data.Des}</p> */}
    <Skills skills={item.data.Skills} />
    <p className="mt-2 text-gray-400">{item.data.uploadedBy}</p>
    <p className="text-gray-400">{item.data.Category}</p>
    <p className="text-gray-400 mb-4">{item.data.SubCategory}</p>
    <h1 className="text-2xl text-green-500 mb-4">rs.{item.data.Budget}</h1>
    <button className="bg-violet-900 hover:bg-violet-950 text-white px-5 py-2 rounded-md font-bold mt-4 transition-colors" onClick={()=>{
      router.push({ pathname: '/projectdetails', query: { proid: item.id, uid: user.uid, clientid: item.data.uid } });
    }}>
      Apply
    </button>
  </div>
  )
}

export default Card