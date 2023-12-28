import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { io } from 'socket.io-client'

import Contacts from '../components/Contacts'
import { getAllNamesRoute,url } from '../utils/ApiRoutes'
import { useNavigate, useLocation } from 'react-router-dom'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'

export default function Chat() {
  const socket=useRef()
  const [allUserNames, setAllUserNames] = useState([])
  const profile = JSON.parse(localStorage.getItem('chattie-user'))
  const [currentChat, setCurrentChat] = useState(undefined)
  const navigate = useNavigate()
  const location = useLocation()
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  useEffect(()=>{
if(profile){
  // console.log("profile changed useeffect")
  socket.current=io(url)
  socket.current.emit('add-user',profile._id)
}
  },[profile])


 


  useEffect(() => {
    const getAllUserNames = async () => {
      const { data } = await axios.get(getAllNamesRoute)
      let filteredNames = data.names.filter(user => user.userName !== profile.userName)
      setAllUserNames(filteredNames)
    }
    getAllUserNames()
  }, [location])
  return (
    <Container>
      <div className="container">
        <div className="contacts">
          <h3>Contacts</h3>
          <Contacts
            contacts={allUserNames}
            currentUser={profile} 
            changeChat={handleChatChange}
          />
        </div>
        {
          currentChat === undefined ?
          <Welcome currentUser={profile} />:
          <ChatContainer currentUser={profile}  currentChat={currentChat} socket={socket}/>
        }
      </div>
    </Container>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap:1rem;
  align-items: center;
background-color: #131324;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display:grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width:1080px) {
    grid-template-columns: 35% 65%;
  }
}

`
