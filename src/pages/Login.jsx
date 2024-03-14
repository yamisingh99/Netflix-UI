import styled from 'styled-components'
import Header from '../components/Header'
import BackgroundImage from '../components/BackgroundImage'
import React, { useState } from 'react';
import { auth } from '../utils/Firebase-config';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });



  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(" fairy ", user);
        navigate("/")
        // ...

      }).catch((error) => {
        const errorCode = error.code;
        console.log("🚀 ~ ans ~ errorCode:", errorCode)
        const errorMessage = error.message;
        console.log(" fairy error ", errorMessage);
        // ..
        if (errorCode === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
          return navigate("/login");
        } else if (errorCode === 'auth/invalid-email') {
          alert('That email address is invalid!');
        } else if (errorCode === 'auth/weak-password') {
          alert('Password should be at least 6 characters');
        } else if (errorCode === 'auth/operation-not-allowed') {
          alert('Operation not allowed kindly retry with valid email and password!');
        }
      })
        ;
    } catch (error) {

      console.log(error);

      // setErrorMsg(error.message); // Uncomment this if you have an `errorMsg` state
    }
  }
  const handleLoginIn = () => {
    navigate("/signup")
  }

  return (
    <Container showpassword={showPassword} >
      <Header />
      <BackgroundImage />
      <div className="content">
        <div className="body">
          <div className="form">
            <form>
              <input type="email" required={true}
                name="email" // Add name attribute
                placeholder="Email address"
                value={formValues.email}
                onChange={(e) => setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })}
              />
              {
                showPassword && <input type="password"
                  required={true}
                  name="password" // Add name attribute
                  placeholder="Password"
                  value={formValues.password}
                  onChange={(e) => setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })} />
              }
              {
                !showPassword && <button onClick={(event) => { event.preventDefault(); setShowPassword(true); }}>Get Started</button>
              }
              <br />
              {
                showPassword && <button onClick={handleSignIn}>Start Membership</button>
              }

            </form>
          </div>
        </div>
      </div>
      <button className='login-button' onClick={(event) => {
        event.preventDefault();
        handleLoginIn();
      }}>
        Log In
      </button>

    </Container>
  )
}

const Container = styled.div`
  position: relative;
  .login-button {
  position: absolute;
  top: 10px; 
  right: 10px; 
  background-color: red ;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
  }
  .text{
    margin-bottom: 10px;
    h1{
      font-size: 2.9rem; 
      margin-bottom: 10px;
      width: 600px;
    }
    h6{
      font-size: 1.2rem;
      margin-top: 10px;
      width: 600px; 
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: white;
    max-width: 400px;
  }
  .form {
    margin-top: 10px; 
    display:grid;
    grid-template-columns: ${({ showpassword }) =>
    showpassword ? "1fr " : "2fr 1fr 1fr"};

    input{
      width: 400px;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      background: transparent;
      border: 1px solid white;
      color: white;
    }
    button{
      width: 50%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      background-color: red;
      border: none;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
