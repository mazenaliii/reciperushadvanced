'use client'
import React, { useEffect, useContext } from 'react';
import { LoginContext } from '../../components/loginProvider/loginProvider';
import { useRouter } from 'next/navigation';
import ProfilePage from '../../components/ProfilePage/profile';
import 'bootstrap/dist/css/bootstrap.min.css';



export default  function Login() {
  const { logged } = useContext(LoginContext);
  const router = useRouter()

  useEffect(() => {
    if (!logged) {
      router.replace('/');
    }
  }, []);

  return (
    <div>
        <ProfilePage />
    </div>
  );
}
