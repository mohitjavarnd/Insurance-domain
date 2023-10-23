import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.email,
    });

    setNewMessage("");
  };

  return (
    <div className="container mt-5">
      <div className="header text-center mb-4">
        <h1 className="fw-bold"><span className="green"> Chat</span> Support Room</h1>
      </div>
      <div className="messages ">
        {messages.map((message) => (
          <div key={message.id} className="bg-success p-3 text-white rounded-4 width-msg mb-2">
            <span className="user  ">{message.user} (mail) :</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form mt-3">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input form-control"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button btn btn-outline-success rounded-0  mt-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
