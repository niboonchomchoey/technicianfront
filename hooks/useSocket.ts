import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../utils/urls";
import useCookies from "./useCookies";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userCookies] = useCookies("user");

  useEffect(() => {
    if (userCookies) {
      const currentSocket = io(API_URL, {
        transportOptions: {
          polling: {
            extraHeaders: {
              jwt: userCookies.jwt,
            },
          },
        },
      });
      setSocket(currentSocket);
    }
  }, []);
  return [socket];
}
