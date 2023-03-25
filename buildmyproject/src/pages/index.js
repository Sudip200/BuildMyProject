import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import styles from '@/styles/Home.module.css'
import app from "../firebase"
import {collection,doc,setDoc,getDocs,getFirestore} from "firebase/firestore"
import { async } from '@firebase/util'

const inter = Inter({ subsets: ['latin'] })

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
     <RegisterPopup isOpen={isOpen} setSignUp={setSignUp} isSignup={isSignup}/>

      </div>
    </>
  )
}
const RegisterPopup = ({ isOpen, onClose ,isSignup,setSignUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Add code to register the student with the provided details
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Close the popup after submitting the form
   // onClose();
    setSignUp(true)
  };

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
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '400px'
      }}>
        <h2 style={{ 
          fontSize: '24px',
          marginBottom: '20px'
        }}>Register Student</h2>
        <form onSubmit={handleSubmit}>
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
      </div>
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