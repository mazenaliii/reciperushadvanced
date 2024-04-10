'use client'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = async (e) => {
    console.log(searchTerm)
    e.preventDefault();
    if (searchTerm.trim() === '') {
      alert('Please enter a search term');
      return;
    }
    const encodedTerm = encodeURIComponent(searchTerm);
    router.push(`/search?q=${encodedTerm}`);
  }
  return (
    <div className='search_bar container'>
        <form className='search_input d-flex justify-content-between align-items-center' onSubmit={handleSearch}>
        <input type="text" placeholder='Looking for a specific recipe?' className='input w-sm-85 sm:width-85' onChange={(e) => setSearchTerm(e.target.value)}/>
            <button type="submit"><BsSearch className='fs-5' /></button>
        </form>
    </div>
  )
}

export default SearchBar