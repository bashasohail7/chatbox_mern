import React, { useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState('')
    const handleEmojiPickerStatus = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick = (event) => {
        setMsg(prev => prev + event.emoji)
    }
    const sendChat = (e) => {
        e.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg('')
            setShowEmojiPicker(false)

        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerStatus} />
                    <div className="emoji-picker-react">
                        {
                            showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />
                        }
                    </div>
                </div>
            </div>
            <form className="input-container" onSubmit={sendChat}>
                <input type="text" value={msg} onChange={e => setMsg(e.target.value)} placeholder='type your messge here ...' />
                <button type='submit' className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>

    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    @media screen and (min-width:720px) and (max-width:1080px) {
        padding: 0 1rem;
        gap:1rem;
    }
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap:1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 1.5rem;
                color:#ffff00c8 ;
                cursor: pointer;
            }
            .emoji-picker-react{
                position: absolute;
                top:-450px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-scroll-wrapper::-webkit-scrollbar{
                    background-color: #080420;
                    width: 5px;
                    

                }
                .emoji-categories{
                    button{
                        filter:contrast(0)
                    }
                }
                .epr-search-container{
                    background-color: transparent;
                    border-color: #9186f3;
                }
                .emoji-group::before{
                    background-color: #080420;
                }
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius:2rem ;
        display: flex;
        align-content: center;
        gap:2rem;
        background-color:#ffffff34;
        .submit{
            cursor: pointer;
        }
        input{
            width: 90%;
            /* height: 60%; */
            background-color: transparent;
            color: white;
            border:none;
            padding-left: 1rem;
            /* align-self: center; */
            font-size:1.2rem;
            &::selection{
                background-color: #9186f3;
            }
            :focus{
                outline:none
            }
        }
        button{
            padding:0.3rem 2rem ;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg{
                color:white;
                font-size: 2rem;
            }

        }
    }
`
