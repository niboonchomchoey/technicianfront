import React, { useContext, useEffect } from 'react';
import { API_URL } from '../../utils/urls';
import useCookies from '../../hooks/useCookies';
import { useState } from 'react';
import useChat from '../../hooks/useChat';
import { MessageInterface } from '../../types/ChatRoomType';
import { useRef } from 'react';
import CloseSvg from '../Svg/Close'
import { ChatContext } from '../../context/chatContext';



function ChatRoom({ chatRoomID, chatRoomData, targetUserEmail }: { chatRoomID: string, chatRoomData: MessageInterface[], targetUserEmail: string }) {
    const [messages, sendMessage] = useChat(chatRoomID, chatRoomData)
    const [newMessage, setNewMessage] = useState<string>("")

    const { updateChatOpen } = useContext(ChatContext)



    const messageRef = useRef<HTMLUListElement>()

    const handleNewMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value)
    }
    const handleSendMessage = () => {
        sendMessage(newMessage)
        setNewMessage("")
    }

    const handleCloseChat = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        updateChatOpen(false, null)
    }

    useEffect(() => {

        const scrollHeight = messageRef.current.scrollHeight;
        const height = messageRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        const scrollTo = maxScrollTop > 0 ? maxScrollTop : 0;

        messageRef.current.scrollTo({ top: scrollTo, behavior: 'smooth' })
    }, [messages])
    return (
        <div className="flex flex-col justify-between w-auto h-80 max-h-80 z-10 overflow-hidden fixed bottom-4 right-6 border border-primary dark:border-darkPrimary rounded-md">
            <div className="bg-primary dark:bg-darkPrimary text-white  dark:text-black flex justify-between items-center py-3 px-4 ">
                <h1 className="text-base font-semibold">{targetUserEmail}</h1>
                <button onClick={handleCloseChat}>
                    <CloseSvg />
                </button>
            </div>
            <div className="flex-auto bg-bgLightSecondary dark:bg-gray-900  relative w-full text-white">
                <ul className=" absolute overflow-y-auto top-0 left-0 h-full w-full" ref={messageRef}>

                    {messages && messages.map((message, i) => {
                        return (
                            <li
                                className={`clear-both ${message.ownedByCurrentUser ? 'float-right' : 'float-left'} flex-col  text-white dark:text-black my-2 mx-1`}
                                key={i}>
                                <p className="py-1 px-2 bg-primary dark:bg-darkPrimary text-md">{message.message}</p>
                                <span className="text-xs text-gray-600 dark:text-gray-300">{message.owner}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex justify-between  border border-primaryDarker dark:border-darkPrimaryDarker">
                <textarea value={newMessage} onChange={handleNewMessageChange}
                    className="flex-1  border-none outline-none resize-none text-black dark:text-white p-4 bg-bgLightSecondary dark:bg-bgDarkPrimary " />
                <button onClick={handleSendMessage} className="py-2 px-3 bg-primary dark:bg-darkPrimary text-white dark:text-black ">
                    ส่ง
                </button>
            </div>

        </div>
    )
}

export default function ChatRoomContainer({ targetUserEmail }: { targetUserEmail: string }) {
    const [chatRoomID, setChatRoomID] = useState(null)
    const [chatMessage, setChatMessage] = useState<MessageInterface[]>([])
    const [userCookies] = useCookies('user')
    useEffect(() => {
        async function fetchChatRoomAPI() {
            const headers = new Headers()

            headers.append("Authorization", `Bearer ${userCookies.jwt}`)
            const findRoomResult = await fetch(`${API_URL}/chatrooms?targetUserEmail=${targetUserEmail}`, {
                method: 'GET',
                headers
            }).then((res) => res.json())
            let sanitizedChatRoomMessage: MessageInterface[] = []
            console.log(findRoomResult)
            if (findRoomResult.chatMessages) {

                sanitizedChatRoomMessage = findRoomResult.chatMessages.map((chat) => {
                    return {
                        message: chat.message,
                        owner: chat.users_permissions_user.email,
                        ownedByCurrentUser: chat.users_permissions_user.email === userCookies.user.email
                    }
                })
            }
            setChatMessage(sanitizedChatRoomMessage)
            setChatRoomID(findRoomResult.chatroomID)
        }

        fetchChatRoomAPI()
    }, [targetUserEmail])
    return (
        <div>
            {
                chatRoomID &&
                <ChatRoom chatRoomID={chatRoomID} chatRoomData={chatMessage} targetUserEmail={targetUserEmail} />
            }
        </div>
    )


}