import Head from 'next/head'
import Image from 'next/image'

import { Router, useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import app from '../firebase'

import {collection,doc,setDoc,getDocs,getFirestore,addDoc} from "firebase/firestore"
import { async } from '@firebase/util'
import { getAuth, onAuthStateChanged,setPersistence,browserLocalPersistence ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";

export default function UserRegistration({ project,uid,clientid }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [r,setR]=useState('reg')
    const [id,setId]=useState('')
    const db=getFirestore(app)
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const router=useRouter()
    const handleLogin=(event)=>{
     
    const auth = getAuth();
     signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      const docRef=doc(db,"Users",user.uid);
      setDoc(docRef,{
      name:user.displayName,
      email:user.email,
      uid:user.uid,
      pic:user.photoURL
     }).then((res)=>{
       console.log(res)
     
      setId(user.uid)
      setPersistence(auth, browserLocalPersistence)
      .then(() => {
        localStorage.setItem('authToken', user.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
     }).catch((err)=>{
      console.log(err)
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
     
      const docRef=doc(db,"Users",user.uid);
      setDoc(docRef,{
       name:name,
       email:user.email,
       uid:user.uid,
       pic:user.photoURL
      }).then((res)=>{
       console.log(res)
       localStorage.setItem('uid',res.uid)
        setId(res.uid)
      }).catch((err)=>{
       console.log(err)
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
     
      setId(user.uid)
      console.log(id)
      
     router.push({pathname:'/userdashboard',query: {uid:user.uid}})
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
        <title>UserRegistration</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
      <div style={{ 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 20px',
  backgroundColor: '#f5f5f5'
}}>
  <div style={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  }}>
    <h2 style={{ 
      margin: '0 0 20px',
      fontSize: '28px',
      color: '#343A40',
      fontWeight: 'bold'
    }}>Register Student</h2>
    <form onSubmit={handleSingUpWithEmail}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="name" style={{ 
          display: 'block',
          color: '#343A40',
          fontSize: '16px',
          marginBottom: '10px'
        }}>Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}  style={{ 
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '100%'
        }}/>
      </div> 
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ 
          display: 'block',
          color: '#343A40',
          fontSize: '16px',
          marginBottom: '10px'
        }}>Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ 
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '100%'
        }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password" style={{ 
          display: 'block',
          color: '#343A40',
          fontSize: '16px',
          marginBottom: '10px'
        }}>Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ 
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '100%'
        }} />
      </div>
      <button type="submit" style={{ 
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer'
      }} >Register</button>
    </form>
    <h2 style={{ 
      margin: '40px 0 20px',
      fontSize: '28px',
      color: '#343A40',
      fontWeight: 'bold'
    }}>Login</h2>
    <form onSubmit={handleLoginWithEmail}>
      <div style={{ marginBottom: '20px' }}>
      </div> 
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ 
          display: 'block',
          color: '#343A40',
          fontSize: '16px',
          marginBottom: '10px'
        }}>Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{
padding: '10px',
borderRadius: '5px',
border: '1px solid #ccc',
width: '100%'
}} />
</div>
<div style={{ marginBottom: '20px' }}>
<label htmlFor="password" style={{
display: 'block',
color: '#343A40',
fontSize: '16px',
marginBottom: '10px'
}}>Password:</label>
<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{
padding: '10px',
borderRadius: '5px',
border: '1px solid #ccc',
width: '100%'
}} />
</div>
<button type="submit" style={{
backgroundColor: '#007bff',
color: '#fff',
padding: '10px 20px',
borderRadius: '5px',
border: 'none',
cursor: 'pointer'
}} >Login</button>
</form>
<button    onClick={handleLogin}            style={{
      backgroundColor: '#fff',
      color: '#757575',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px 20px',
      display: 'flex',
      height:'30px',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'

    }}>
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" style={{ marginRight: '10px',width:'10px' }} />
      Continue with Google
    </button>
  </div>
</div>

    </>
  )
}

// export async function getServerSideProps(context) {
//   const { proid,uid,clientid } = context.query
//   const db = getFirestore(app)
//   const projectDoc = doc(db, 'AllProjects', proid)
//   const projectData = await getDoc(projectDoc)
//   const project = projectData.data()

//   return {
//     props: {
//       project,
//       uid:uid?uid:'none',
//       clientid
//     },
//   }
// }