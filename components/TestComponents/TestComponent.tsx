import React from 'react';
import { useContext } from 'react';
import { ChatContext } from '../../context/chatContext';
import { createPortal } from 'react-dom'


export default function TestComponent() {
    const { chatOpen } = useContext(ChatContext)

    return chatOpen ? createPortal(<div>
        <h1>Chat</h1>
    </div>, document.getElementById('chat')) : null
}