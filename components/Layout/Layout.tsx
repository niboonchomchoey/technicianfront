import React, { ReactNode } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { ChatContext } from '../../context/chatContext';
import useCookies from '../../hooks/useCookies';
import { API_URL } from '../../utils/urls';
import Nav from '../Nav/Nav';

const SOCKET_SERVER_URL = API_URL


export default function Layout({ children }: { children: ReactNode }) {
    const { chatOpen, updateChatOpen, testFunction } = useContext(ChatContext)
    const [userCookies] = useCookies('user')
    const socketRef = useRef<Socket>(null)
    useEffect(() => {
        if (userCookies) {
            socketRef.current = socketIOClient(SOCKET_SERVER_URL)

            socketRef.current.on('broadcast', ({ targetUserEmail, fromUserEmail }) => {
                if (userCookies.user.email === targetUserEmail) {
                    updateChatOpen(true, fromUserEmail)
                }
            })

        }
        // return () => {
        //     socketRef.current.disconnect()
        // }
    }, [])
    return (
        <div className="flex flex-col min-h-screen min-w-full dark:bg-bgDarkPrimary transition-3 font-body">
            <Nav />
            <main className="flex-1 w-full">
                {children}
            </main>
            <footer className="">
                Footer
            </footer>
        </div>
    )
}