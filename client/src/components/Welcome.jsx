import React from "react";
import styled from "styled-components";

const Welcome = ({ currentUser }) => {
  //   console.log(currentUser);
  return (
    <>
      <Container>
        <h1>welcome, {currentUser.username}!</h1>
        <p>please select the person you want to chat</p>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Welcome;
