import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";

const ChatInput = ({ handleMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleMsg(msg);
    }
    setMsg("");
  };

  const onEmojiClick = (event, emojiObject) => {};
  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={(e) => sendChat(e)} />
            {showEmojiPicker && (
              <div className="emoji-picker-react">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        </div>
        <form className="input-container" onSubmit={sendChat}>
          <input
            type="text"
            placeholder="Type your msg here.."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #142d4c;
  border-radius: 0 0 0.5rem 0;
  padding: 0 1rem;
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffc93c;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        left: -15px;
        top: -465px;
      }
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-between;
    border-radius: 0.3rem;
    background-color: #385170;
    gap: 1rem;
    input {
      width: 90%;
      border: none;
      padding: 5px 10px;
      outline: none;
      background-color: transparent;
      color: white;
    }
    button {
      width: 4rem;
      padding: 5px 0;
      outline: none;
      border: none;
      border-radius: 0 0.3rem 0.3rem 0;
      background-color: #113f67;
      svg {
        color: white;
        font-size: 1.5rem;
      }
      &:hover {
        cursor: pointer;
        background-color: #00204a;
      }
    }
  }
`;

export default ChatInput;
