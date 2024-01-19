'use client'
import React, { useContext, useEffect } from 'react'
import { LoginContext } from '@/components/loginProvider/loginProvider'
import ProfilePage from '@/components/ProfilePage/profile'
import { useRouter } from 'next/navigation';


const Profile = () => {
  const { logged } = useContext(LoginContext)
  const router = useRouter()
  useEffect(() => {
    if(logged === false) {
      router.push('/')
    }
  }, [logged])
  return (
    <>
     <ProfilePage />
    </>
  )
}

export default Profile