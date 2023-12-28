import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../assets/loader.gif'
import { setAvatarRoute } from '../utils/ApiRoutes'
import { Buffer } from 'buffer'

export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)

    const setProfilePicture = async () => {

    }
    useEffect(() => {
        const getAvatars = async () => {
            const data = []
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.round() * 1000)}`)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString('base64'))
                // data.push(image)
            }
            setAvatars(data)
            setIsLoading(false)
        }
        getAvatars()
    }, [])
    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index) => {
                            return (
                                <div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar'
                                        onClick={() => { setSelectedAvatar(index) }}
                                    />

                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size:100% ;
    }
    .title-container{
        h1{
            color:white
        }
    }
    .avatars{
        display: flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }
`