import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
top: 0;
.logo{
  img{
    height: 5rem;
    z-index: 2;
    position: absolute;
    top: 0;
  }
}
.btn{
  left: 0;
  background-color: #e50914;
  z-index: 2;
  position: absolute;
  border: none;
  cursor: pointer;
  font-weight: bold;  
  font-size: 1.05 rem;
  color: white;
}
`;

function Header( props) {
  const navigate = useNavigate();
  return (
    <Container >
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button className= "btn" onClick={()=>navigate(props.login ? "/login" : "/signup" )}>
        {props.login ? "log In" : "Sign in"}
      </button>
    </Container>
  )
}

export default Header