'use client'
import React, { useEffect, useContext } from 'react';
import { LoginContext } from '../../components/loginProvider/loginProvider';
import { useRouter } from 'next/navigation';
import ProfilePage from '@/components/ProfilePage/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";



export default  function Login() {
  const { logged } = useContext(LoginContext);
  const router = useRouter()

  // useEffect(() => {
  //   if (!logged) {
  //     router.replace('/');
  //   }
  // }, [logged]);

  return (
    <div>
        <ProfilePage />
    </div>
  );
}
