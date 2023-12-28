import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import { getAllNamesRoute, registerRoute } from '../utils/ApiRoutes'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [allUserNames, setAllUserNames] = useState({})
    const [userNameMsg, setUserNameMsg] = useState('')
    const location = useLocation()
    const submitHandler = async (e) => {
        e.preventDefault()
        if (handleValidation()) {
            try {
                const { password, confirmPassword, email, userName } = formData
                //calling api
                const { data } = await axios.post(registerRoute, {
                    userName,
                    email,
                    password,
                })
                localStorage.setItem('chattie-user', JSON.stringify(data.user))
                navigate('/')
            } catch (error) {
                console.log(error);
                alertMe(error.response.data.message)
            }
        }
    }
    const alertMe = (msg) => toast.error(msg, {
        position: 'bottom-right',
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'

    })
    const handleValidation = () => {
        const { password, confirmPassword, email, userName } = formData
        if (password !== confirmPassword) {
            alertMe('Password and confirm password should be same')
            return false
        }
        else if (userName.length < 3) {
            alertMe('User name is too short, should be atleast 3 letters')
            return false
        }
        else if (userNameMsg !== '') {
            alertMe('UserName already used, please use another one')
            return false
        }
        return true
    }
    useEffect(() => {
        const getAllUserNames = async () => {
            const { data } = await axios.get(getAllNamesRoute)
            setAllUserNames(data)
        }
        getAllUserNames()
    }, [location])
    useEffect(()=>{
if(localStorage.getItem('chattie-user')){
    // navigate('/')
}

    },[])
    const onChangeHandler = async (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (name === 'userName') {
            // 
            let checkUserNameMatch = allUserNames.names.filter(x => x.userName === value)
            if (checkUserNameMatch.length > 0) {
                setUserNameMsg('UserName already used, try another')
            }
            else {
                setUserNameMsg('')
            }
        }

    }
    return (
        <>
            <FormContainer>
                <form onSubmit={submitHandler}>
                    <div className="brand">
                        <img src={Logo} alt='logo' />
                        <h1>Chattie</h1>
                    </div>

                    <input type='text'
                        placeholder='User Name'
                        name='userName'
                        required
                        value={formData.userName || ''}
                        onChange={onChangeHandler} />
                    <p className='errorMsg' style={{ display: userNameMsg ? 'block' : 'none' }}>{userNameMsg}</p>
                    <input type='email'
                        placeholder='Email'
                        name='email'
                        required
                        value={formData.email || ''}
                        onChange={onChangeHandler} />

                    <input type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={formData.password || ''}
                        onChange={onChangeHandler} />

                    <input type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        required
                        value={formData.confirmPassword || ''}
                        onChange={onChangeHandler} />

                    <button type='submit' >Create User</button>
                    <span><Link to='/login'>Already have an account ?
                    </Link> </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}
const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
}
img{
    height:5rem;
}
h1{
    color: white;
    text-transform: uppercase;
}
form{
    display: flex;
    flex-direction: column;
    gap:2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    .errorMsg{
        color:#ff2a2a;
        font-weight: bold;
        
        
    }
    input{
        background-color: transparent;
        padding: 1rem;
        border:0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width:100%;
        font-size:1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
        background-color: #4e0eff;
        color: white;
        padding:1rem 2rem;
        font-weight: bold;
        border:none;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition:0.5s ease-in-out ;
        &:hover{
            color: #131324;
           background-color: #997af0;
       }
    }
    span{
        color: white;
        text-transform:uppercase;
        a{
            color: white;
        }
    }
}


`
