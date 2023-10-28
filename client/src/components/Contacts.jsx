import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserAvatar, setCurrentUserAvatar] = useState();
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserAvatar(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <Container>
        <div className="brand">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111812.png"
            alt=""
          />
          <h3>kiteup</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <>
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}>
                  <div className="avatar">
                    <img src={contact.avatarImage} alt="avatar" />
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img src={currentUserAvatar} alt="avatar" />
          </div>
          <div className="username">
            <h3>{currentUserName}</h3>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  border-radius: 0.5rem 0 0 0.5rem;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: #142d4c;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    img {
      width: 1.5rem;
      filter: invert(1);
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.4rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #38598b;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #38598b;
      width: 95%;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 0.2rem;
      .avatar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem;
        img {
          width: 2rem;
        }
        h3 {
          text-transform: capitalize;
          font-weight: 500;
        }
      }
    }
  }
  .selected {
    background-color: #113f67;
  }
  .contact:hover {
    color: #113f67;
    background-color: #e7eaf6;
  }
  .current-user {
    display: flex;
    border-right: 0.2rem solid #38598b;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: #113f67;
    .avatar {
      img {
        width: 2rem;
      }
    }
    .username {
      h3 {
        color: white;
        text-transform: capitalize;
        font-weight: 600;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.4rem;
      .username {
        font-size: 0.5rem;
      }
    }
  }
`;

export default Contacts;
