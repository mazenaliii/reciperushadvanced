'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/Main page/SearchBar';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Trending from '@/components/Main page/Trending';
import { motion } from 'framer-motion';
import LoginBtn from '@/components/Main page/LoginBtn';

export default function Home() {
  const [logged, setLogged] = useState(false);




  return (
    <div className="gradient">
      <div className="text-light fw-bold d-flex justify-content-center flex-column align-items-center container ">
        <motion.div
          animate={{ opacity: [0, 1], y: [50, 0] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          initial={{ opacity: 0, y: 50 }}
        >
          <div className="first-title">
            <h1 className="title_text">RecipeRush</h1>
            <h3 className="desc">Find your favorite dish with just one cliick!</h3>
            {logged ? <SearchBar /> : (
              <motion.div
                animate={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                initial={{ opacity: 0, y: 50 }}>
                <LoginBtn />
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: [0, 1], y: [50, 0] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          initial={{ opacity: 0, y: 50 }}
        >
          <Trending />
        </motion.div>

        <Image
          className='vector'
          src="/Vector.png"
          alt="vector"
          width={150}
          height={150}
        />

        <div className="info col-12 bg-danger rounded p-5 mb-5">
          <p className='fw-bold text-center mb-5'>RecipeRush is a community for people who love to cook! Looking for a delicious dish ? Can’t find a specific recipe ? Search in our community you’ll find any dish you can imagine! You can also share a dish you liked with other people.</p>
          <p className='fw-bold text-center fs-5'>RecipeRush was created by “Mazen Ali”  in 2024 all rights reserved </p>
        </div>


      </div>
    </div>
  )
}
