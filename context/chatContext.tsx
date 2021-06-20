import React, { createContext } from "react";
import { useState } from "react";
import { ReactNode } from "react-markdown";


interface ChatContextInterface {
    chatOpen: boolean
    targetUserEmail: string | null
    updateChatOpen: (open: boolean, targetUserEmail: string) => void
    testFunction: () => void
}

const ChatContextDefaultValue: ChatContextInterface = {
    chatOpen: false,
    targetUserEmail: null,
    updateChatOpen: () => { },
    testFunction: () => { }
}


export const ChatContext = createContext<ChatContextInterface>(ChatContextDefaultValue)


export default function ChatProvider({ children }: { children: ReactNode }) {

    const [chatOpen, setChatOpen] = useState<boolean>(ChatContextDefaultValue.chatOpen)
    const [targetUserEmail, setTargetUserEmail] = useState<string | null>(null)
    const updateChatOpen = (open: boolean, targetUserEmail: string) => {
        console.log("FROM Chat Provider")
        setTargetUserEmail(targetUserEmail)
        setChatOpen(open)
    }
    const testFunction = () => {
        console.log("testFunction")
    }
    return (
        <ChatContext.Provider value={{ chatOpen, updateChatOpen, targetUserEmail, testFunction }}>
            {children}
        </ChatContext.Provider>
    )
}