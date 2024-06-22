import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

import app from "../firebase"
import {collection,doc,setDoc,getDocs,getFirestore,addDoc, getDoc,query,where,orderBy, serverTimestamp} from "firebase/firestore"
import { async } from '@firebase/util'
import { onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
//import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { getStorage ,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import React from 'react';
import Script from 'next/script'
import { useRouter } from 'next/router'

export default function ClientRegistration() {
 const [route,setRoute]=useState('log');
 const [name, setName] = useState('');
 const router=useRouter()
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [id,setId]=useState('');
 const [r,setR]=useState(true);
  const db=getFirestore(app)
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleLogin=(event)=>{
     
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
          const docRef=doc(db,"clients",user.uid);
          setDoc(docRef,{
          name:user.displayName,
          email:user.email,
          uid:user.uid,
          pic:user.photoURL
         }).then((res)=>{
           console.log(res)
          setId(user.uid)
          router.push({pathname:'/clientdashboard',query:{clientId:user.uid}})
         }).catch((err)=>{
          console.log(err)
          alert(err)
         })
           
          }).catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
           
            const credential = GoogleAuthProvider.credentialFromError(error);
            
          });
      
      
        }
        const handleSingUpWithEmail=(event)=>{
          event.preventDefault();
          createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
         
          const docRef=doc(db,"clients",user.uid);
          setDoc(docRef,{
           name:name,
           email:user.email,
           uid:user.uid,
           pic:user.photoURL
          }).then((res)=>{
           console.log(res)
          router.push({pathname:'/clientdashboard',query:{clientId:user.uid}})
           // setId(res.uid)
          }).catch((err)=>{
           console.log(err)
           alert(err)
          })
      
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
        }
        const handleLoginWithEmail=(event)=>{
      event.preventDefault()
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          setId(user.uid)
          router.push({pathname:'/clientdashboard',query:{clientId:user.uid}})
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
        });
        }
      
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>
     
      <div className='flex justify-center items-center h-dvh'>
    {
     r === true?(
      <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg w-70">
          <h2 className="mb-6 text-3xl text-violet-400 font-bold">Client Register</h2>
          <form onSubmit={handleSingUpWithEmail} className="w-full">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-400 text-lg mb-2">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-md border border-gray-600 w-full bg-gray-700 text-white"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-400 text-lg mb-2">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className ="p-3 rounded-md border border-gray-600 w-full bg-gray-700 text-white"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-400 text-lg mb-2">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-md border border-gray-600 w-full bg-gray-700 text-white"
              />
            </div>
            <button type="submit" className="w-full bg-violet-900 hover:bg-blue-950 text-white p-3 rounded-md font-bold">Register</button>
          </form>
          <button onClick={handleLogin} className="mt-6 w-full bg-gray-700 text-gray-300 border border-gray-600 p-3 rounded-md flex items-center justify-center">
            <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" width={20} height={20} />
            <span className="ml-2">Continue with Google</span>
          </button>
          <button onClick={() => setR(false)} className="mt-6 w-full text-violet-600">
            Login 
            </button>
        </div>
    ):
       (<div className='m-auto w-80 flex items-center justify-center flex-col gap-4 bg-gray-800 p-8 rounded'>
          <h2 className="mt-12 mb-6 text-3xl text-violet-400 font-bold">Login</h2>
          <form onSubmit={handleLoginWithEmail} className="w-full">
            <div className="mb-6">
              <label htmlFor="email-login" className="block text-gray-400 text-lg mb-2">Email:</label>
              <input
                type="email"
                id="email-login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-md border border-gray-600 w-full bg-gray-700 text-white"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password-login" className="block text-gray-400 text-lg mb-2">Password:</label>
              <input
                type="password"
                id="password-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-md border border-gray-600 w-full bg-gray-700 text-white"
              />
            </div>
            <button type="submit" className="w-full bg-violet-900 hover:bg-violet-950 text-white p-3 rounded-md font-bold">Login</button>
          </form>
          <button onClick={handleLogin} className="mt-6 w-full bg-gray-700 text-gray-300 border border-gray-600 p-3 rounded-md flex items-center justify-center">
            <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" width={20} height={20} />
            <span className="ml-2">Continue with Google</span>
          </button>
          <button onClick={() => setR(true)} className="mt-6 w-full text-violet-800 underline ">Register</button>
        
      </div>
       )
       
}
      </div>
    </>
  )
}

// export async function getServerSideProps({ query}) {
//   const clientId = query.clienttId;
//   const UserId = query.Userid;
//     return {
//       props: {
//         clientId,
//        UserId
//       }
//     }
//   }