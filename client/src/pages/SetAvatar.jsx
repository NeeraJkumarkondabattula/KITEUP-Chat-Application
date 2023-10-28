import { setAvatarRoute } from "../utils/APIRoutes";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import axios from "axios";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("chat-user-data")) {
      navigate("/login");
    }
  }, []);
  const [avatars, setAvatars] = useState([
    {
      url: "https://cdn-icons-png.flaticon.com/128/4140/4140048.png",
    },
    {
      url: "https://cdn-icons-png.flaticon.com/128/4333/4333609.png",
    },
    {
      url: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
    },
    {
      url: "https://cdn-icons-png.flaticon.com/128/924/924915.png",
    },
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const setProfilePic = async () => {
    if (selectedAvatar === undefined) {
      toast.error("please select avatar!");
    }
    const user = await JSON.parse(localStorage.getItem("chat-user-data"));
    const data = await axios
      .post(`${setAvatarRoute}/${user._id}`, {
        avatarImage: avatars[selectedAvatar],
      })
      .then((r) => r.data);
    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem("chat-user-data", JSON.stringify(user));
      navigate("/");
    }
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>pick an avatar as your profile</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}>
                <img
                  src={avatar.url}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button type="submit" onClick={() => setProfilePic(selectedAvatar)}>
          Select
        </button>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  height: 100vh;
  width: 100vw;
  background-color: #38598b;

  .title-container {
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      transition: 0.5s;
      border: 0.5rem solid tranparent;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border-radius: 50%;
        width: 6rem;
        aspect-ratio: 1/1;
        padding: 0.2rem;
      }
    }
    .selected {
      border: 0.4rem solid #42b883;
    }
    .loading {
      width: 100px;
    }
  }
  button {
    width: 10%;
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    outline: none;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 0.2rem;
    background-color: #113f67;
    &:hover {
      cursor: pointer;
      background-color: #a2a8d3;
    }
  }
`;
export default SetAvatar;
