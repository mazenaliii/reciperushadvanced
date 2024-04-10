'use client'
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { LoginContext }  from '../../../components/loginProvider/loginProvider'
import 'bootstrap/dist/css/bootstrap.min.css';



const RecipeDetails = () => {
  const { logged } = useContext(LoginContext)
  const router = useRouter()
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();

  if(!logged) {
      router.push('/')
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        setRecipe(response.data.meals[0]);
        console.log(recipe)
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

 

  return (
    <div className='resultsBackground'>
    <Container className={'mt-5'}>
    { recipe ? (
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={recipe.strMealThumb}
              alt={recipe.strMeal}
              height="400"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8} className={''}>
          <Typography variant="h4" gutterBottom className='fw-bold text-light'>
            {recipe.strMeal}
          </Typography>
          <Typography variant="body1" className='text-light'>{recipe.strInstructions}</Typography>
          {recipe.strYoutube && (
            <Typography variant="body2" gutterBottom>
              <a href={recipe.strYoutube} target="_blank" rel="noreferrer">
                Watch Video Instructions
              </a>
            </Typography>
          )}
        </Grid>
      </Grid>
          ) : <p className='text-light text-align-center'>Loading recipe details...</p>}
    </Container>
    </div>
  );
};

export default RecipeDetails;
