/* eslint-disable no-unused-vars */
import React from 'react'
import LoginForm from '../../Components/FormLogin/FormLogin'
import RegisterForm from '../../Components/FormRegister/FormRegister'
import './LoginPage.css'

const LoginPage = () => {
    return (
        <div className='container-flex'>
            <LoginForm></LoginForm>
            <RegisterForm></RegisterForm>
        </div>
    )
}

export default LoginPage;