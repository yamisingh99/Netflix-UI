import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import dropdownlogo from '../assets/dropdownlogo.png'
import notification from '../assets/notification.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaPowerOff, FaSearch } from 'react-icons/fa'
import { useState } from 'react'
import { auth, } from '../utils/Firebase-config';
import { signOut } from 'firebase/auth';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const items = [
  {
    key: '1',
    type: 'group',
    label: 'Account',
    children: [
      {
        key: '1-1',
        label: 'profile',
      },
      {
        key: '1-2',
        label: 'settings',
      },
    ],
  },
  {
    key: '2',
    label: 'Themes',
    children: [
      {
        key: '2-1',
        label: 'dark',
      },
      {
        key: '2-2',
        label: 'Light',
      },
    ],
  },
  {
    key: '3',
    label: 'Signout from Netflix',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5d menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
];

function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv-shows" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/my-list" },
  ];
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const navigate = useNavigate();
  function handleAnchorClick(e) {
    e.preventDefault();
    // Additional logic if needed
  }


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign out successful");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };
  console.log("🚀 ~ handleSignOut ~ handleSignOut:", handleSignOut)
  return (
    <Container>
      <nav className={` leftrightnav flex ${isScrolled ? "scrolled" : ""}`}>
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
            <input className="search-input"
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
          <img className="bell" src={notification} alt="dropdownlogo" />

          <Dropdown className='dropdown'
            menu={{
              items,
            }}
          >
            <button onClick={handleAnchorClick}>
              <Space>
                <img className='dropdown' src={dropdownlogo} alt="" />
                <DownOutlined />
              </Space>
            </button>

          </Dropdown>
          <button className="signoutbtn" onClick={handleSignOut}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
.scrolled {
    background-color: black;
  }
.leftrightnav{
  display: flex;  
  justify-content: space-between;
}
.left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
}

.bell{
  width: 1.7rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;

}

.dropdown{
  width: 2rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-right: 0.5rem;
}
.links {
        list-style-type: none;
        gap: 1.5rem;
        li {
          a {
            color: black;
            text-decoration: none;
          }
        }
      }
      .right {
  display: flex;
  align-items: center;
}

.search {
  margin-right: 0.5rem;
  position: relative;
}

.show-search {
  display: block;
  margin: 1rem 1rem 1 rem 1rem;
}
.search button {
  width:2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0.5rem 0.5rem  0.5rem 0.5rem;
}

.search-input {
  width: 0;
  opacity: 0;
  visibility: hidden;
  transition: width 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

.search:hover .search-input,
.search:focus .search-input {
  width: 200px; /* Adjust width as needed */
  opacity: 1;
  visibility: visible;
}

.search-input::placeholder {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
}

.search:hover .search-input::placeholder,
.search:focus .search-input::placeholder {
  opacity: 1;
  visibility: visible;
}

.search-input{
  margin: 1rem 1rem 1 rem 1rem;

}

.right button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 1rem 1rem 1 rem 1rem;

}
.right button:focus {
  outline: none;
}
.signoutbtn{
  margin-right:0.5rem;
}
`;
export default Navbar