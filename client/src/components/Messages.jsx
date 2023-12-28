import React from 'react'
import styled from 'styled-components'
export default function Messages({ currentMessages }) {
    return (
        <Container>
            {
                currentMessages.map(({ fromSelf, message }, index) => {
                    return (<div className={`message ${fromSelf ? "mine" : "not-mine"}`} key={index}>
                        <p >{message} </p></div>)
                })
            }
        </Container>
    )
}
const Container = styled.div`
    height: 90%;
    overflow-y: auto;
    
    .message{
        /* overflow-x: auto; */
       
    }
    div{
        padding: 1rem;
        display: flex;
        margin: 0.5rem 0;
        /* position: relative; */
    }
    .mine{
        /* position: absolute; */
        background-color: #29f054;
        /* align-items: right; */
        width: fit-content;
        border-radius: 1rem;
        padding: 0.5rem;
        max-width: 45%;
        margin-left:auto;
    }
    .not-mine{

        background-color: #f8d825;
        width: fit-content;
        border-radius: 1rem;
        padding: 0.5rem;
        text-align: left;
    }
   

`