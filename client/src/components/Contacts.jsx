import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { useLocation, } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import styled from 'styled-components'
export default function ({ contacts, currentUser,changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(currentUser?.userName)
    const [currentSelected, setCurrentSelected] = useState(undefined)
   const changeCurrentChat=(index,contact)=>{
setCurrentSelected(index)
changeChat(contact)
   }
    return (
        <>
            {
                currentUserName &&
                <Container>
                    <div className="brand">
                        <img src={Logo} alt='logo' />
                        <h3>Chattie</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((info, index) => {
                                return <div
                                    onClick={()=>changeCurrentChat(index,info)}
                                    className={`contact ${index === currentSelected ? 'selected' : ''}`}
                                    key={index} style={{ color: 'white' }}>
                                    <div className='username'>
                                        <h3>{info.userName}</h3>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                   
                </Container>
            }
        </>

    )
}
const Container = styled.div`
    display: grid;
    height: 90%;
    grid-template-rows: 10% 90%;
    overflow: hidden;
    background-color: #080420;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
           height :2rem ;
        }
        h3{
            color:white;
            text-transform: uppercase;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        .contact{
            background-color: #ffffff39;
            min-height: 2.5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding:0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
               h3{
                color: white;
               }
            }
        }
        .selected{
            background-color:#9186f3
        }
@media screen  and (min-width:720px) and (max-width:1080px){
    gap: 0.5rem;

}
    }


`
