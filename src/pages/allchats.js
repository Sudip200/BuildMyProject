import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useParams, useState } from 'react'

import app from "../firebase"
import {collection,doc,setDoc,getDocs,getFirestore,addDoc, getDoc,query,where,orderBy, serverTimestamp} from "firebase/firestore"
import { async } from '@firebase/util'
import { onSnapshot } from 'firebase/firestore'
//import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { getStorage ,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import React from 'react';
import Script from 'next/script'
import { useRouter } from 'next/router'

export default function AllChat({ chats }) {
  const router =useRouter()
  return (
    <>
      <Head>
        <title>All Chats</title>
      </Head>

      <div style={{ backgroundColor: '#f2f2f2', padding: '1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>All Chats</h1>

        {chats.map(chat => (
          <div key={chat.id} style={{ backgroundColor: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem' }} onClick={()=>{ router.push({pathname:'/chatscreen',query:{clienttId:chat.recipient, Userid:chat.sender}})}}   >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold' }}>{chat.senderName}</span>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>{new Date(chat.timestamp).toLocaleString()}</span>
            </div>
            <div>{chat.message}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const dbQuery=context.query
  const UserId = dbQuery.Userid;
  const db = getFirestore(app) // get your Firestore database instance

  const messagesRef = collection(db, 'messages');
  //const q = query(messagesRef, where('users', 'array-contains', UserId));
  //console.log(messagesRef)
  const querySnapshot = await getDocs(messagesRef);
//console.log("ll",querySnapshot)
  const chats = [];
  querySnapshot.forEach((doc) => {
   // console.log(doc.data().sender)
 if(doc.data().sender===UserId  ){
  const chat={
    id: doc.id,
    ...doc.data(),
  }
  chat.timestamp = JSON.stringify(chat.timestamp)
  //new Date(chat.timestamp.seconds * 1000).toISOString();
  



  chats.push(chat);

 }
  });
  console.log(chats)

  return {
    props: {
      chats:chats,
    },
  };
}
