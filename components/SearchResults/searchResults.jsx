'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BsSearch } from 'react-icons/bs'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';


const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState([])
  const url = useSearchParams()
  const router = useRouter()
  const searchTermQuery = url.get('q')

  const handleSearch = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (searchTerm.trim() === '') {
      alert('Please enter a search term');
      return;
    }
    const encodedTerm = encodeURIComponent(searchTerm);
    router.push(`/search?q=${encodedTerm}`);

    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`).then(res => {
        setRecipes(res.data.meals)
        console.log(recipes)
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function apiFetching() {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTermQuery}`).then(res => {
        setRecipes(res.data.meals)
        console.log(recipes)
      })
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    apiFetching()
  }, [])


  const cardStyles = {
    borderRadius: '31px',
    border: '1px solid #FF7575',
    boxShadow: '0px 4px 57.3px 11px rgba(255, 0, 0, 0.25)',
    margin: '25px',
    width: '250px ',
    height: '250px',
    backgroundSize: 'cover', // Adjust as needed
    objectFit: 'cover', // Adjust as needed
    padding: '15px',
    overflow: 'hidden',
  }

  const redirect = (recipeId) => {
    router.push(`/recipe/${recipeId}`)
  }

  function Recipe({ title, img, id }) {
    return (
      <Card style={cardStyles} className={'recipeResults'}>
        <CardActionArea>
          <CardContent>
            <CardMedia
              sx={{ height: 180, borderRadius: '25px' }}
              image={img}
              title={title}
              onClick={() => redirect(id)}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <div className='resultsBackground'>
      <Container className='resultsPageContainer'>
        <div className='search_bar_2 container'>
          <form className='search_input d-flex justify-content-between align-items-center' onSubmit={handleSearch}>
            <input type="text" placeholder='Looking for a specific recipe?' className='input w-sm-85 sm:width-85' onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit"><BsSearch className='fs-5 text-light' /></button>
          </form>
        </div>
        <div className='results'>
          { recipes ? recipes.map((recipe) => (
            <Recipe key={recipe.idMeal} title={recipe.strMeal} img={recipe.strMealThumb} id={recipe.idMeal} />
          )
          ) : <p>No results found.</p>}

        </div>
      </Container>
    </div>
  )

}


export default SearchResults