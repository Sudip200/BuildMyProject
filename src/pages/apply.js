import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useParams, useState } from 'react'
import Link from 'next/link'
import app from "../firebase"
import {collection,doc,setDoc,getDocs,getFirestore,addDoc, getDoc, Timestamp, serverTimestamp} from "firebase/firestore"
import { async } from '@firebase/util'
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { getStorage ,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import { useRouter } from 'next/router'

export default function ProposalSend({projectId,Uid,clientid}) {
      
   const db=getFirestore(app)
   const storage = getStorage(app);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [proposal, setProposal] = useState("");
   const [link, setLink] = useState("");
   const [resume, setResume] = useState(null);
  const router =useRouter()
  if(Uid==='none'){
    //  router.push({pathname:'/useregister'})   
    return <div>Please log in first <Link href='/useregister'>Click Here</Link></div>
  }
   const storageRef = ref(storage,`resumes/${resume}`);
   useEffect(()=>{
    const docRef=doc(db,"Users",Uid)
    getDoc(docRef).then((res)=>{
      setEmail(res.data().email)
      setName(res.data().name)
    }).catch(err=>console.log(err))
   },[])
   

   const handleSubmit = (e) => {
     e.preventDefault();
     // Do something with form data
     const proRef=collection(db,"messages");
     uploadBytes(storageRef, resume).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(ref(storage,`resumes/${resume}`)).then((url)=>{
          addDoc(proRef,{
            // projectid:projectId,
            // uid:Uid,
            // name:name,
            // email:email,
            // proposal:proposal,
            // link:link,
            // resume:url
            users: [clientid, Uid].sort(),
            sender:Uid,
            recipient: clientid,
            message:`Hi My Name is ${name} email ${email} 
            ${proposal} .My Url link ${link} .My Resume link ${url}`,
            timestamp: serverTimestamp(),
          }).then((res)=>{
           router.push({pathname:'/chatscreen',query:{clienttId:clientid, Userid:Uid}})
          }).catch(err=>alert(err));
      })
    }).catch(err=>alert(err));
   };
   const handleSubmitProposal=(e)=>{
    e.preventDefault()
    const proRef=collection(db,"Proposal");
    uploadBytes(storageRef, resume).then((snapshot) => {
     console.log('Uploaded a blob or file!');
     getDownloadURL(ref(storage,`resumes/${resume}`)).then((url)=>{
         addDoc(proRef,{
            projectid:projectId,
            uid:Uid,
            name:name,
            email:email,
            proposal:proposal,
            link:link,
            resume:url
          //  users: [clientid, Uid].sort(),
          //  sender:Uid,
          //  recipient: clientid,
          //  message:`Hi My Name is ${name} email ${email} 
          //  ${proposal} .My Url link ${link} .My Resume link ${url}`,
          //  timestamp: serverTimestamp(),
         }).then((res)=>{
          router.push({pathname:'/userdashboard',query:{uid:Uid}})
         }).catch(err=>alert(err));
     })
   }).catch(err=>alert(err));
   }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
     <div>
  <form
    style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: "500px",
      margin: "0 auto",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f7f7f7",
    }}
    onSubmit={handleSubmit}
  >
    <label
      htmlFor="name"
      style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px" }}
    >
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={name}
      
      onChange={(e) => setName(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#fff",
        marginBottom: "10px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      }}
      required
    />

    <label
      htmlFor="email"
      style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px" }}
    >
      Contact Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#fff",
        marginBottom: "10px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      }}
      required
    />

    <label
      htmlFor="proposal"
      style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px" }}
    >
      Proposal
    </label>
    <textarea
      id="proposal"
      name="proposal"
      value={proposal}
      onChange={(e) => setProposal(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#fff",
        marginBottom: "10px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        resize: "vertical",
        minHeight: "100px",
      }}
      required
    />

    <label
      htmlFor="link"
      style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px" }}
    >
      Relevant Link
    </label>
    <input
      type="url"
      id="link"
      name="link"
      value={link}
      onChange={(e) => setLink(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#fff",
        marginBottom: "10px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      }}
      required
    />

    <label
      htmlFor="resume"
      style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px" }}
    >
      Resume Upload
    </label>
    <input
      type="file"
      id="resume"
      name="resume"
      onChange={(e) => setResume(e.target.files[0])}
      style={{
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#fff",
      marginBottom: "10px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      }}
      required
      /><button
      type="submit"
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#4caf50",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
      }}
    >
      Submit
    </button>
    </form>
</div>
    </>
  )
}
export async function getServerSideProps({ query}) {
  const projectId = query.proid;
  const Uid = query.uid;
  const clientid=query.clientid;
    
   //const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
   
//   getDoc(docRef).then()
    return {
      props: {
        projectId,
        Uid:Uid?Uid:'none',
         clientid
      }
    }
  }