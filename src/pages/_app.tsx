import React from 'react'
import '../styles/globals.css'
import DarkModeLayout  from '../components/layout'
import { UserProvider } from '../context/context'
export default function App({ Component, pageProps }):React.ReactElement {
  return (
    <DarkModeLayout>
    <UserProvider>
       <Component {...pageProps} />
    </UserProvider>
  </DarkModeLayout>
  )
}
