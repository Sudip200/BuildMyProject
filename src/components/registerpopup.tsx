import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import app from "../firebase";

const RegisterPopup = ({ isOpen, onClose ,isSignup,setSignUp,setOpen,button,setButton,setId}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [r,setR]=useState('reg')
    const db=getFirestore(app)
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const handleLogin=(event)=>{
     
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential:any= GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      const docRef=doc(db,"Users",user.uid);
      setDoc(docRef,{
      name:user.displayName,
      email:user.email,
      uid:user.uid,
      pic:user.photoURL
    }).then((res: any) => {
      console.log(res)
      setSignUp(true)
      setOpen(false)
      setButton('apply')
      setId(user.uid)
    }).catch((err) => {
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
      }).then((res:any)=>{
       console.log(res)
       setSignUp(true)
       setOpen(false)
       setButton('apply')
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
      // ...
      setSignUp(true)
      setOpen(false)
      setButton('apply')
      setId(user.uid)
  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
    }
  
    if (!isOpen) {
      return null;
    }
  
    return (
        <div>
            <div>
                <h2>Register Student</h2>
                <form onSubmit={handleSingUpWithEmail}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <h2>Login</h2>
                <form onSubmit={handleLoginWithEmail}></form>
          <h2 style={{ 
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#343A40',
      textTransform: 'uppercase'
    }}>Register Student</h2>
          <form onSubmit={handleSingUpWithEmail}>
             <div style={{ marginBottom: '10px' }}>
              <label htmlFor="name"style={{ 
          marginRight: '10px',
          display: 'block',
          color: '#343A40',
          fontSize: '16px'
        }}>Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}  style={{ 
          width: '100%',
          padding: '10px',
          border: '1px solid #ced4da',
          borderRadius: '5px'
        }}/>
            </div> 
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email" style={{ 
          marginRight: '10px',
          display: 'block',
          color: '#343A40',
          fontSize: '16px'
        }}>Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ 
          width: '100%',
          padding: '10px',
          border: '1px solid #ced4da',
          borderRadius: '5px'
        }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ 
          marginRight: '10px',
          display: 'block',
          color: '#343A40',
          fontSize: '16px'
        }}>Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ 
          width: '100%',
          padding: '10px',
          border: '1px solid #ced4da',
          borderRadius: '5px'
        }} />
            </div>
            <button type="submit" style={{ 
        background: '#0070f3',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        display: 'block',
        margin: '0 auto',
        width: '100%',
        maxWidth: '200px',
        textTransform: 'uppercase'
      }} >Registeredrfe</button>
  
  
          </form>
          <h2 style={{ 
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#343A40',
      textTransform: 'uppercase'
    }}>Login</h2>
          <form onSubmit={handleLoginWithEmail}>
             <div style={{ marginBottom: '10px' }}>
            </div> 
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email" style={{ 
          marginRight: '10px',
          display: 'block',
          color: '#343A40',
          fontSize: '16px'
        }}>Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ 
          width: '100%',
          padding: '10px',
          border: '1px solid #ced4da',
          borderRadius: '5px'
        }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ 
          marginRight: '10px',
          display: 'block',
          color: '#343A40',
          fontSize: '16px'
        }}>Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ 
          width: '100%',
          padding: '10px',
          border: '1px solid #ced4da',
          borderRadius: '5px'
        }} />
            </div>
            <button type="submit" style={{ 
        background: '#0070f3',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        display: 'block',
        margin: '0 auto',
        width: '100%',
        maxWidth: '200px',
        textTransform: 'uppercase'
      }} >Log In</button>
          </form>
          <button onClick={handleLogin} style={{ 
    background: '#fff',
    color: '#333',
    padding: '10px 20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'block',
    margin: '0 auto',
    width: '100%',
    maxWidth: '200px',
    textTransform: 'uppercase',
    backgroundImage: 'url("https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg")',
    backgroundPosition: 'left center',
    backgroundRepeat: 'no-repeat',
    paddingLeft: '40px',
    backgroundSize: '24px 24px'
  }}>Sign in with Google</button>
  
        </div> 
      </div>
    );
  };