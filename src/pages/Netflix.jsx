import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import Movies from './Movies';
function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  return (
    <Container className='netflix'>
      <Navbar className="navnet" isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} width={1540} alt="" srcset="" />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="" />
          </div>
          <div className="button-flex">
            <button className="flex j-centre a-centre" onClick={()=>navigate('/player')}>
              <FaPlay />
            </button>
            <button className="flex j-centre a-centre">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <div className="movies">
       <Movies/>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .navnet {
    margin-top: 0;
    z-index: 1;
    background-color: transparent;
  }

  .hero {
    position: relative;
    overflow: hidden;

    img {
      width: 100vw;
      height: auto;
    }
  }

  .container {
    position: absolute;
    top: 45%;
    left: 0;
    transform: translateY(-50%);
    z-index: 3;
  }

  .logo img {
    width:100vw;
    height:auto;
  }

  .button-flex {
    margin: 0.6rem;
    display:flex;
        button {
          font-size: 1rem;
          margin-right:1rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.5rem;
            }
          }
        }   
  }
`;
export default Netflix;
