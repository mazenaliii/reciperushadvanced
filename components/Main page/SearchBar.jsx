'use client'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { motion } from 'framer-motion'

const SearchBar = () => {
  return (
    <div className='search_bar container'>
        <form className='search_input d-flex justify-content-between align-items-center'>
        <input type="text" placeholder='Looking for a specific recipe?' className='input w-sm-85 sm:width-85'/>
            <button type="submit"><BsSearch className='fs-5' /></button>
        </form>
    </div>
  )
}

export default SearchBar