import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { use, useState } from 'react'
import styles from '@/styles/Home.module.css'
import app from "../firebase"
import {collection,doc,setDoc,getDocs,getFirestore,addDoc} from "firebase/firestore"
import { async } from '@firebase/util'
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";


export default function Home({arrayofprojects}) {
   const [isSignup,setSignUp]=useState(false)
   const [isOpen,setOpen]=useState(false)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{}}>
        <h1 style={{textAlign:'center'}}>All Projects that are available currently</h1>
     {arrayofprojects.map((item)=>{
      return(<div style={{ 
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        maxWidth: '200px',
        margin: '0 auto',
        textAlign:'center'

      }}>
        <h2 style={{ fontSize: '24px' }}>{item.data.Title}</h2>
        <p>{item.data.Des}</p>
        <p>{item.data.Skills}</p>
        <p>{item.data.uploadedBy}</p>
        <p>{item.data.Category}</p>
        <p>{item.data.Subcategory}</p>
        <h1 style={{color:'green'}}>rs.{item.data.Budget}</h1>
        <button style={{ 
          background: '#0070f3',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '10px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}  onClick={()=>{
            if(!isSignup){
              setOpen(true)
            }
        }}>Apply</button>
        
      </div>)
  
     })}
     <RegisterPopup isOpen={isOpen} setSignUp={setSignUp} isSignup={isSignup} setOpen={setOpen}/>

      </div>
    </>
  )
}
const RegisterPopup = ({ isOpen, onClose ,isSignup,setSignUp,setOpen}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [route,setRoute]=useState('nor')
  const db=getFirestore(app)
  const provider = new GoogleAuthProvider();
  const handleSubmitSignUp = (event) => {
    event.preventDefault();

    // TODO: Add code to register the student with the provided details
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
   
   const docRef=collection(db,"Users");
   addDoc(docRef,{
    name:name,
    email:email,
    password:password
   }).then((res)=>{
    alert("Registration successful");
    setSignUp(true)
    setOpen(false)
   }).catch((err)=>{
    alert("Can not register some error occurred");
   })
    
    
  };
  const handleLogin=(event)=>{
    console.log("regr")
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
    console.log(user)
    const docRef=collection(db,"Users");
   addDoc(docRef,{
    name:user.displayName,
    email:user.email,
    uid:user.uid,
    pic:user.photoURL
   }).then((res)=>{
    
    setSignUp(true)
    setOpen(false)
   }).catch((err)=>{
    console.log(err)
   })
     
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
     // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });


  }

  if (!isOpen) {
    return null;
  }

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
     { route==='nor' && <div style={{background:'white',padding:'70px',maxWidth:'200px'}}>

      <button onClick={handleLogin} style={{ 
          background: '#0070f3',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '10px',
          fontWeight: 'bold',
          fontSize: '16px'
        }} >Log in with Google</button><br/>
    <button onClick={()=>setRoute('reg')} style={{ 
          background: '#0070f3',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '10px',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>Sign Up</button>
      </div>
}
    

      { route==='reg' && <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px'
      }}>
        <h2 style={{ 
          fontSize: '24px',
          marginBottom: '20px'
        }}>Register Student</h2>
        <form onSubmit={handleSubmitSignUp}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name" style={{ marginRight: '10px' }}>Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={{ 
            background: '#0070f3',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>Register</button>
        </form>
      </div>}
      { route=='log' && <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px'
      }}>
        <h2 style={{ 
          fontSize: '24px',
          marginBottom: '20px'
        }}>Register Student</h2>
        <form onSubmit={handleLogin}>
          {/* <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name" style={{ marginRight: '10px' }}>Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div> */}
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={{ 
            background: '#0070f3',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>Log In</button>
        </form>
      </div>}
    </div>
  );
};


export async function getServerSideProps(context) {
  let arrayofprojects=[]
 const db= getFirestore(app);
 const ref=collection(db,"AllProjects");
 const docRef= await getDocs(ref);
 docRef.forEach((doc) => { 
  // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`); 
  arrayofprojects.push({id:doc.id ,data:doc.data()})
});
console.log(arrayofprojects)
  return {
    props: {
      arrayofprojects 
    },
  };
}