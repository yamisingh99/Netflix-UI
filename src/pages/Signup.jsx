import styled from 'styled-components'
import Header from '../components/Header'
import BackgroundImage from '../components/BackgroundImage'
import React, { useState } from 'react';
import { auth } from '../utils/Firebase-config';
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";



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

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  // const [errorMsg, setErrorMsg] = useState('');
  // const handleSubmission = () => {
  //   if (!values.email || !values.pass) {
  //     setErrorMsg("Fill all fields");
  //     return;
  //   }
  //   setErrorMsg("");
  // };

  const [formValues, setFormValues] = useState(
    {
      email: "",
      password: "",
    }
  );

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = formValues;
      const ans = await createUserWithEmailAndPassword(auth, email, password);
      console.log(ans);
    } catch (error) {
      console.log(error);
      // setErrorMsg(error.message); // Uncomment this if you have an `errorMsg` state
    }
  }
  return (
    <Container showpassword={showPassword} >
      <Header />
      <BackgroundImage />
      <div className="content">
        <div className="body">
          <div className="text">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create or restart your membership.</h6>
          </div>
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
              {
                showPassword && <button onClick={handleSignIn}>Start Membership</button>
              }
            </form>
          </div>
        </div>
      </div>
      <button className='login-button'>Log In</button>
    </Container>
  )
}
