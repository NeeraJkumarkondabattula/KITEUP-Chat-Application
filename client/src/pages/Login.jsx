import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-user-data")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.email === "" || values.password === "") {
      toast.error("Please enter all the details!");
      setValues({
        email: "",
        password: "",
      });
    } else if (values.password.length === "") {
      toast.error("Password length should be minimum 8!");
      setValues({
        email: "",
        password: "",
      });
    } else {
      const { password, email } = values;
      const data = await axios
        .post(loginRoute, {
          email,
          password,
        })
        .then((r) => {
          return r.data;
        });
      // console.log(data);
      if (data.status === false) {
        toast.error(data.message);
      }
      if (data.status === true) {
        const { username, email, _id, avatarImage, isAvatarImageSet, _v } =
          data.user;
        toast.success("Login successfull");
        localStorage.setItem(
          "chat-user-data",
          JSON.stringify({
            username,
            email,
            _id,
            avatarImage,
            isAvatarImageSet,
            _v,
          })
        );
        setTimeout(() => navigate("/"), 1000);
      }
    }
  };
  return (
    <div>
      <FormContainer>
        <div className="brand">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111812.png"
            alt=""
          />
          <h1>kiteUp</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          <button type="submit">Login</button>
          <span>
            Already Have account ? <Link to="/register">register</Link>
          </span>
        </form>
      </FormContainer>
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
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #113f67;
  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    img {
      height: 2rem;
      filter: invert(1);
    }
    h1 {
      text-transform: uppercase;
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #38598b;
    padding: 2rem 3rem;
    border-radius: 0.2rem;
    input {
      background-color: transparent;
      width: 100%;
      color: white;
      padding: 0.5rem;
      outline: none;
      border-radius: 0.2rem;
      font-size: 1rem;
      border: 0.1rem solid white;
      &:focus {
        background-color: transparent;
        border: 0.1rem solid #a2a8d3;
      }
    }
    input::placeholder {
      color: white;
      opacity: 0.9;
    }
    button {
      width: 100%;
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
    span {
      text-align: center;
      font-size: 0.8rem;
      text-transform: uppercase;
      color: white;
      a {
        text-decoration: none;
        font-weight: 600;
        color: #00204a;
      }
    }
  }
`;

export default Login;
