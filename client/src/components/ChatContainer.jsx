import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute, getAllMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState();
  const [arrivalMessage, setArrivalMessage] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat) {
      async function ff() {
        await axios
          .post(getAllMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
          })
          .then((r) => setMessages(r.data));
      }
      ff();
    }
  }, [currentChat]);

  const handleMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      message: msg,
      from: currentUser._id,
      to: currentChat._id,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currentChat.avatarImage} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {currentUser &&
              messages &&
              messages.map((message, index) => {
                return (
                  <>
                    <div key={uuidv4()} ref={scrollRef}>
                      <div
                        className={`message ${
                          message.fromSelf ? "sended" : "received"
                        }`}>
                        <div className="content">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <ChatInput handleMsg={handleMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  overflow: auto;
  align-content: center;
  grid-template-rows: 10% 80% 10%;
  .chat-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding: 1rem;
    .user-details {
      gap: 1rem;
      display: flex;
      align-items: center;
      .avatar {
        img {
          width: 3rem;
        }
      }
      .username {
        h3 {
          text-transform: capitalize;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #00204a;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 45%;
        text-transform: capitalize;
        overflow-wrap: break-word;
        padding: 0.5rem 0.8rem;
        font-size: 1.2rem;
        border-radius: 0rem 0.6rem 0.8rem 0.6rem;
        background-color: #24527a;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        text-transform: capitalize;
        border-radius: 0.6rem 0rem 0.8rem 0.6rem;
      }
    }
  }
`;

export default ChatContainer;
