'use client'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react'

const LoginBtn = () => {
    return (
        <div className="buttons d-flex flex-row justify-content-center align-items-center ">
            <Link href='/login'>
                    <Button className="login_btn mx-2" type='button'>Login / Register</Button>
            </Link>
        </div>
    )
}

export default LoginBtn