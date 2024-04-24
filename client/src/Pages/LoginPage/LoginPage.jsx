/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import LoginForm from '../../Components/FormLogin/FormLogin'
import RegisterForm from '../../Components/FormRegister/FormRegister'
import './LoginPage.css'

const LoginPage = ({ setUser }) => {
    return (
        <div className='container-flex'>
            <LoginForm setUser={setUser}/>
            <RegisterForm></RegisterForm>
        </div>
    )
}

export default LoginPage;