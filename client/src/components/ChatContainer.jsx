import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import Logout from './Logout'
import Messages from './Messages'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/ApiRoutes'

export default function ChatContainer({ currentUser, currentChat, socket }) {
    const [currentMessages, setCurrentMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        socket.current.emit('send-msg', {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        const msgs = [...currentMessages]
        msgs.push({ fromSelf: true, message: msg })
        setCurrentMessages(msgs)
    }
    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-recieve', (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [])
    useEffect(() => {
        arrivalMessage && setCurrentMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [currentMessages])

    useEffect(() => {
        const getAllMessages = async () => {
            const { data } = await axios.post(getAllMessagesRoute, {

                from: currentUser._id,
                to: currentChat._id,
            })
            setCurrentMessages(data)
        }
        if (currentChat) {
            getAllMessages()
        }
    }, [currentChat])
    return (
        <>
            {
                currentChat &&
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                            </div>
                            <div className="username">
                                <h2>{currentChat.userName}</h2>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className="chat-messages" >
                        {
                            currentMessages.map(({ fromSelf, message }, index) => {
                                return (
                                    <div key={index} ref={scrollRef}>
                                        <div className={`message ${fromSelf ? "mine" : "not-mine"}`} >
                                            <p >{message} </p></div>
                                    </div>)
                            })
                        }
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </Container>
            }
        </>
    )
}
const Container = styled.div`
    /* padding-top: 1rem; */
    display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .username{
                h2{
                    color:white;
                    text-decoration: underline;
                }
            }
        }
    }
    .chat-messages{
        height: 98%;
        padding: 0 0.25rem;
        overflow: auto;
        &::-webkit-scrollbar{
        width:0.2rem;
         &-thumb{
           background-color: #ffffff39;
           width:0.1rem;
           border-radius:1rem ;
         }
    }
    
    .message{
        /* overflow-x: auto; */
        width: fit-content;
        border-radius: 1rem;
        padding: 0.5rem;
        max-width: 45%;
    }
    div{
        /* padding: 1rem; */
        /* display: flex; */
        margin: 0.5rem 0;
        /* position: relative; */
    }
    .mine{
        background-color: #29f054;
       
        margin-left:auto;
    }
    .not-mine{
        background-color: #f8d825;
    }
    }
    `
