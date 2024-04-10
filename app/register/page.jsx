'use client'
import React, { useContext } from 'react';
import { LoginContext }  from '../../components/loginProvider/loginProvider'
import RegisterForm from '../../components/AuthenticationPage/registerForm';
import { redirect } from 'next/navigation'




export default function Login() {
    const { logged } = useContext(LoginContext)

    return (
        <div>
            {logged ? (
                    redirect('/')
            ) : <RegisterForm />}
        </div>
    );
}