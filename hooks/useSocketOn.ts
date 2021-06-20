import React, { useEffect } from "react";
import { Socket } from "socket.io-client";

export default function useSocketOn(socket: Socket | null) {
  useEffect(() => {
    socket.on("returnuser", ({ user, room }) => {
      console.log(user);
      console.log(room);
    });
  }, []);
}
