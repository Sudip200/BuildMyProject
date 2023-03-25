import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useParams, useState } from 'react'

import app from "../firebase"
import {collection,doc,setDoc,getDocs,getFirestore,addDoc, getDoc} from "firebase/firestore"
import { async } from '@firebase/util'
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";


export default function ProposalSend({projectId,Uid}) {

   const db=getFirestore(app)
  // const docRef=doc(db,"AllProjects",projectId)
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [proposal, setProposal] = useState("");
   const [link, setLink] = useState("");
   const [resume, setResume] = useState(null);
 
   const handleSubmit = (e) => {
     e.preventDefault();
     // Do something with form data
     console.log({ name, email, proposal, link, resume });
     // Reset form
     setName("");
     setEmail("");
     setProposal("");
     setLink("");
     setResume(null);
   };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     {/* <div>
     <form
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        margin: "0 auto",
      }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "10px" }}
        required
      />

      <label htmlFor="email">Contact Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }}
        required
      />

      <label htmlFor="proposal">Proposal</label>
      <textarea
        id="proposal"
        name="proposal"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        style={{ marginBottom: "10px" }}
        required
      />

      <label htmlFor="link">Relevant Link</label>
      <input
        type="url"
        id="link"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ marginBottom: "10px" }}
        required
      />

      <label htmlFor="resume">Resume Upload</label>
      <input
        type="file"
        id="resume"
        name="resume"
        onChange={(e) => setResume(e.target.files[0])}
        style={{ marginBottom: "10px" }}
        required
      />

      <button type="submit" style={{ marginTop: "10px" }}>
        Submit
      </button>
    </form>
     </div> */}
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
    
   //const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
   
//   getDoc(docRef).then()
    return {
      props: {
        projectId,
        Uid
      }
    }
  }