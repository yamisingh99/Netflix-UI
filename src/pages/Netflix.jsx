import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  return (
    <Container className='netflix'>
      <Navbar isScrolled={isScrolled} />
      <h1>Netflix</h1>
    </Container>
  )
}
const Container = styled.div`

    color: black;
    background-color: black; 
  
`;


export default Netflix