/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

interface Message {
    username: string;
    content: string;
  }

export const useChat = () => {
  const user = TokenManager.getUser();
  const userName = user?.userName;
  
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [username, setNickname] = useState(userName);
    const [stompClient, setStompClient] = useState<any>(null);
  
  const handleNicknameChange = (event :any) => {
    setNickname(event.target.value);
  };

  const handleMessageChange = (event :any) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (stompClient !== null) {
      if (message.trim()) {
        const chatMessage = {
          username,
          content: message,
        };
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        setMessage("");
      }
    }
  };

useEffect(() => {
  const socket = new SockJS(`${Localhost}/ws`);
  const client = Stomp.over(socket);

  client.connect({}, () => {
    client.subscribe("/topic/messages", (receivedMessage) => {
      const parsedMessage = JSON.parse(receivedMessage.body);
      setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    });
  });

  setStompClient(client);

  return () => {
    if (stompClient) {
      stompClient.disconnect(() => {});
    }
  };
}, []);


  return { messages, message, username, handleNicknameChange, handleMessageChange, sendMessage };
};
