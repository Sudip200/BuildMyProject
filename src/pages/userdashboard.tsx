import Head from 'next/head'
import { use, useEffect, useState,useContext } from 'react'
import app from "../firebase"
import { getStorage ,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import React from 'react'
import { getFirestore, collection, getDocs, addDoc,doc, setDoc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { getAuth, onAuthStateChanged,setPersistence,browserLocalPersistence ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import { useRouter } from 'next/router'
import { UserContext } from '../context/context';
export default function UserDashBoard() {
const router=useRouter()
const db=getFirestore(app)

const [user, setUser] = useState({name:'',email:'',uid:''});
const usera = useContext(UserContext) 

async function getUser(){
  const auth = getAuth();
  console.log(usera)
  let uid;
  if (usera) {
    uid=usera.uid
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data() as { name: string; email: string; uid: string; })
    } else {
      console.log("No such document!");
    }
  } else {
    console.log("No user found")
  }

}

useEffect(()=>{
  if (usera) {
    getUser()
  }
},[usera])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>
     
      <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold mb-6">Welcome, {user.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-600 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Total Earnings</h3>
          <p className="text-lg">₹0</p>
        </div>
        <div
          className="bg-green-600 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-green-700 transition-colors"
          onClick={() => {
            router.push({ pathname: '/allapplication' });
          }}
        >
          <h3 className="text-xl font-semibold mb-2">All Applications</h3>
        </div>
        <div className="bg-purple-600 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Saved Projects</h3>
        </div>
        <div className="bg-yellow-600 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Apply as Mentor</h3>
        </div>
        <div
          className="bg-red-600 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-red-700 transition-colors"
          onClick={() => {
            router.push({ pathname: '/' });
          }}
        >
          <h3 className="text-xl font-semibold mb-2">Apply for More Projects</h3>
        </div>
        <div className="bg-indigo-600 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Get a Mentor for Projects</h3>
        </div>
      </div>
    </div>
   
    </>
  )
}
