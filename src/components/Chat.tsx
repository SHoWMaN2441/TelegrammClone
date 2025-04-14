import { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onValue, push, ref, set } from "firebase/database";

type User = {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
};

type Message = {
  id: null | undefined;
  message: string;
  userId: string;
  userName: string;
  photoURL: string;
  date: Date;
};

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchCurrentUser = () => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user as User);
        } else {
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSend = async () => {
    if (!message) {
      alert("Message kiriting!");
      return;
    }
    const messagesEndpoint = ref(database, "messages");
    const reference = push(messagesEndpoint);
    await set(reference, {
      message,
      userId: user?.uid,
      userName: user?.displayName,
      photoURL: user?.photoURL,
      date: new Date().toISOString(),
    });
    setMessage("");
  };
  const fetchMessages = () => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((item) => {
        messages.push({ id: item.key, ...item.val() });
      });
      setMessages(messages);
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div id="chat-container" className="">
        <div className="bg-white shadow-md rounded-lg w-[1200px] mx-auto">
          <div className="px-4 py-3 border-b bg-blue-500 text-white rounded-t-lg flex justify-center items-center">
            <p className="text-lg font-semibold">Chat App</p>
          </div>
          <div
            id="chatbox"
            className="p-4 h-96 overflow-y-auto bg-gray-100 rounded-lg shadow-md flex flex-col"
          >
            {messages.map((message) => {
              const isUserMessage = message.userId === user?.uid;
              return (
                <div
                  key={message.id}
                  className={`flex items-end mb-3 ${
                    isUserMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUserMessage && (
                    <img
                      src={message.photoURL}
                      alt={message.userName}
                      className="w-10 h-10 rounded-full mr-3 shadow-md"
                    />
                  )}
                  <div
                    className={`flex flex-col ${
                      isUserMessage ? "items-end" : "items-start"
                    }`}
                  >
                    <p
                      className={`${
                        isUserMessage ? "text-cyan-500" : "text-lime-500"
                      }  text-xs mb-1 font-semibold`}
                    >
                      {message.userName}
                    </p>
                    <div
                      className={`relative px-4 py-2 text-white  text-lg rounded-xl shadow-md  ${
                        isUserMessage
                          ? "bg-blue-400"
                          : "bg-green-400 text-black"
                      }`}
                    >
                      {message.message}
                      <span className="absolute bottom-0 right-1 text-xs text-slate-500">
                        {new Date(message.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  {isUserMessage && (
                    <img
                      src={message.photoURL}
                      alt={message.userName}
                      className="w-10 h-10 rounded-full ml-3 shadow-md"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              id="send-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
