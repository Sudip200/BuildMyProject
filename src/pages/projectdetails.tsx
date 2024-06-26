import Head from 'next/head'
import Image from 'next/image'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import app from '../firebase'
export default function ProjectDetails({ project,uid,clientid ,proid}) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
 

  return (
    <>
      <Head>
        <title>{project.Title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-screen'>
       <div className="max-w-md mx-auto p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-white mb-6 font-sans  ">
  <h1 className="text-3xl font-bold mb-4 text-violet-400">{project.Title}</h1>
  <p className="text-lg leading-relaxed mb-6">{project.Des}</p>
  <div className="flex items-center justify-between mb-6">
    <p className="text-lg font-bold">Category: {project.Category}</p>
    <p className="text-lg font-bold">Subcategory: {project.SubCategory}</p>
  </div>
  <p className="text-lg font-bold mb-6">Budget: rs.{project.Budget}</p>
  <div className="flex flex-wrap items-center mb-6">
    <p className="text-lg font-bold mr-4">Skills:</p>
    <div>
      {project.Skills.split(",").map((skill) => (
        <span
          key={skill}
          className="inline-block bg-gray-600 text-white py-1 px-3 mr-2 mb-2 rounded-full"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
  <p className="text-lg font-bold mb-6">Posted by: {project.uploadedBy}</p>
  <button 
    className="bg-violet-900 hover:bg-violet-900 w-full text-white py-2 px-4 rounded-md font-bold text-lg"
    onClick={() => router.push({ pathname: '/apply', query: { clientid, proid, uid } })}
  >
    Apply
  </button>
</div>
</div>

    </>
  )
}

export async function getServerSideProps(context) {
  const { proid,uid,clientid } = context.query
  const db = getFirestore(app)
  const projectDoc = doc(db, 'AllProjects', proid)
  const projectData = await getDoc(projectDoc)
  const project = projectData.data()

  return {
    props: {
      project,
      uid:uid?uid:'none',
      clientid,
      proid
    },
  }
}