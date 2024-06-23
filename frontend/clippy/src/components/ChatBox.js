import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import speak from './speechSynthesis';

function ChatBox() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  // Create a ref for the chat container
  const chatContainerRef = useRef(null);

  const chat = async (e, message) => {
    e.preventDefault();

    setIsLoading(true); // Set loading to true when making the API request

    let msgs = [...chats];
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats: msgs,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Resonse:", data);
        msgs.push({ role: "assistant", content: data.output.message.content });
        setChats(msgs);
        setIsLoading(false); // Set loading to false when response is received
        
        
        speak(data.output.message.content);
      })
      .catch((error) => {
        console.error("Error during API request:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });

    // Scroll to the bottom after updating chats
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    setMessage("");
  };

  useEffect(() => {
    // Scroll to the bottom when chats change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <main>
      <h1>DamorAI</h1>

      <section ref={chatContainerRef}>
        {chats && chats.length
          ? chats.map((chat, index) => {
              return (
                <p
                  key={index}
                  className={chat.role === "user" ? "user_msg" : ""}
                >
                  <span>
                    <b>{chat.role.toUpperCase()}</b>
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              );
            })
          : ""}
      </section>

      {isLoading && (
        <div className="loading-indicator">
          <p>Typing...</p>
        </div>
      )}

      <form autoComplete="off" action="" onSubmit={(e) => chat(e, message)}>
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
