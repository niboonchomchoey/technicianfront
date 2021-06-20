import React from 'react';
import { useContext } from 'react';
import { ChatContext } from '../../context/chatContext';
import { createPortal } from 'react-dom'
import ChatRoomContainer from '../ChatRoom/ChatRoom';
import { useEffect } from 'react';

export default function ChatPortal() {
    const { chatOpen, targetUserEmail } = useContext(ChatContext)


    return chatOpen ? createPortal(<><ChatRoomContainer targetUserEmail={targetUserEmail} /></>, document.getElementById('chat')) : null

}