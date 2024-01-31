'use client'
import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../components/loginProvider/loginProvider';
import LoginForm from '@/components/AuthenticationPage/loginForm';
import { useRouter } from 'next/navigation';

export default  function Login() {
  const { logged } = useContext(LoginContext);
  const router = useRouter()

  useEffect(() => {
    if (logged) {
      router.replace('/');
    }
  }, [logged]);

  return (
    <div>
        <LoginForm />
    </div>
  );
}
