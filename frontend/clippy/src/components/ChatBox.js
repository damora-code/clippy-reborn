// ChatBox.js
import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import speak from './speechSynthesis';

function ChatBox() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const chat = async (e, message) => {
    e.preventDefault();
    setIsLoading(true);

    let msgs = [...chats];
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chats: msgs }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server Response:", data);
      msgs.push({ role: "assistant", content: data.output.message.content });
      setChats(msgs);
      setIsLoading(false);
      speak(data.output.message.content);
    })
    .catch((error) => {
      console.error("Error during API request:", error);
      setIsLoading(false);
    });

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    setMessage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <main>
      <section ref={chatContainerRef}>
        {chats && chats.length ? chats.map((chat, index) => (
          <div key={index} className={`message-container ${chat.role}`}>
            <div className={`message ${chat.role}_msg`}>
              <p>{chat.content}</p>
            </div>
          </div>
        )) : null}
        {isLoading && (
          <div className="loading-indicator">
            <p>typing...</p>
          </div>
        )}
      </section>
      <form autoComplete="off" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default ChatBox;
