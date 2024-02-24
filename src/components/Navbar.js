import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaPowerOff, FaSearch } from 'react-icons/fa'
import { useState } from 'react'
import { auth, } from '../utils/Firebase-config';
import { signOut } from 'firebase/auth';


function Navbar({ isScrolled }) {
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv-shows" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/my-list" },
    ];
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("Sign out successful");
            })
            .catch((error) => {
                // An error happened.
                console.error("Error signing out:", error);
            });
    };
    return (
        <Container>
            <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
                <div className="left flex a-centre">
                    <div className="brand flex a-centre j-centre">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className="links flex">
                        {links.map(({ name, link }) => (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="right flrx a-centre">
                    <div className={`search ${showSearch ? "show-search" : ""} `}>
                        <button onFocus={() => setShowSearch(true)} onBlur={() => {
                            if (!inputHover) setShowSearch(false);

                        }} >
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Search for a title..."
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false);
                                setInputHover(false);
                            }}
                        />

                    </div>
                    <button onClick={handleSignOut}>
                        <FaPowerOff />
                    </button>
                </div>
            </nav>

        </Container>
    );
}

const Container = styled.div`
  .scrolled {
    background-color: #222; /* Dark grey instead of black for better visibility */
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242; /* Red color for the button icon */
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6); /* Dark grey instead of black for better visibility */
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;

export default Navbar