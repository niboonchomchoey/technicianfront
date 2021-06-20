import type { AppProps } from 'next/app'
import React from 'react'
import '../styles/globals.css'
import ChatContextProvider from '../context/chatContext'
import ChatPortal from '../components/Portal/ChatPortal'



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChatContextProvider>
      <Component {...pageProps} />
      <ChatPortal />
    </ChatContextProvider>
  )
}

export default MyApp
