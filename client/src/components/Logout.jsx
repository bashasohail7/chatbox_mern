import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import {BiPowerOff} from 'react-icons/bi'

export default function Logout() {
    const navigate=useNavigate()
    const handleLogout=async()=>{
        localStorage.removeItem('chattie-user')
        navigate('/login')
    }
  return (
    <Button onClick={handleLogout}>

    <BiPowerOff/>
    </Button>
  )
}
const Button=styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color:#4c3e8a ;
border: none;
cursor: pointer;
svg{
    font-size: 1.3rem;
    color:#ebe7ff
}
    
`