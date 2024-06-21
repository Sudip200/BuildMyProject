import React from 'react'
import '../styles/globals.css'
import DarkModeLayout  from '../components/layout'
export default function App({ Component, pageProps }):React.ReactElement {
  return (
    <DarkModeLayout>
  <Component {...pageProps} />
  </DarkModeLayout>
  )
}
