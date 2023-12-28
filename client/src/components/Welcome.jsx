import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
export default function Welcome({ currentUser }) {
    return (
        <Container>
            <img src={Robot} alt='Welcoming Robot' />
            <h1> Welcome, <span>{currentUser?.userName} !</span></h1>
            <h3>Please select a chat to Start Messaging.</h3>
        </Container>
    )
}
const Container = styled.div`
    /* background-color: white; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;
    }
    span{
        color:#4e0eff ;
    }
    

`
