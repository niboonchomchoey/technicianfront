
import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { MessageInterface } from "../types/ChatRoomType";
import { API_URL } from "../utils/urls";
import useCookies from "./useCookies";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = API_URL



const useChat = (roomId: string, chatRoomData: MessageInterface[]) => {
    const [messages, setMessages] = useState<MessageInterface[]>(chatRoomData); // Sent and received messages
    const [userCookies] = useCookies('user')
    const socketRef = useRef<Socket>(null);
    useEffect(() => {

        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, jwt: userCookies.jwt },
        });

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, ({ message, owner, currentRoomId }: { message: string, owner: string, currentRoomId: string }) => {
            if (currentRoomId !== roomId) {
                return
            }
            const incomingMessage = {
                message,
                owner,
                ownedByCurrentUser: owner === userCookies.user.email,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = useCallback(function (messageBody: string) {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody
        })
    }, [])

    return [messages, sendMessage] as const;
};

export default useChat;