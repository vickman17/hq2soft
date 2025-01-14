import { useEffect, useState } from "react";

// Define a hook to handle WebSocket logic
interface WebSocketHook {
  messages: string[];
  sendMessage: (message: string) => void;
}

const useWebSocket = (url: string): WebSocketHook => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [connectionState, setConnectionState] = useState<"connecting" | "open" | "closed" | "error">("connecting");

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnectionState("open");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setConnectionState("closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionState("error");
    };

    ws.onmessage = (event) => {
      // Add received message to the messages state
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    setSocket(ws);

    return () => {
      if (ws) ws.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (connectionState === "open" && socket) {
      socket.send(message);
    } else {
      console.error(`WebSocket is ${connectionState}. Message not sent.`);
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
