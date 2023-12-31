import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';

const cardStyles = {
   borderRadius: '31px',
   border: '1px solid #FF7575',
   boxShadow: '0px 4px 57.3px 11px rgba(255, 0, 0, 0.25)',
   margin: '25px',
   width: '450px ',
   height: '275px',
   backgroundSize: 'cover',
   padding: '15px',
   overflow: 'hidden'
}

function Recipe({ title, desc, img, styles }) {
  return (
    <Card style={cardStyles} className={img}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image={src}
          alt="smth to eat"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className={styles}>
            {title}
          </Typography>
          <Typography variant="body2" color="white">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const Trending = () => {
  return (
    <div className='trending_section'>
      <h1 className="title_text mb-5">
        Trending  Recipes
      </h1>
      <div className="recipe_container d-flex w-full justify-content-center flex-xxl-row flex-column">

        <Recipe
          img='recipeCard1 recipeCard'
          title='Spaghitti'
          desc='A beautifull plate of spaghetti made with: 2 bags of spaghetti, 3 small spoons of salt, some vegetables as you like and tomato sauce'
          styles='recipe_title_1'
        />

        <Recipe
          img='recipeCard2 recipeCard'
          title='Great Italian Pizza'
          desc='Eat the best and tasty Italian pizza with just a little bit of ingredients! 2kg dough , tomato sauce, some pepparoni, some vegetables, and put it in microwave for 30mins to 45mins then have spero spathis and have fun!   '
          styles='recipe_title_2'
        />

        <Recipe
          img='recipeCard3 recipeCard'
          title='Great Burger'
          desc='Want a better burger than mac? There you have it! Ingredients : 2 pieces of bread, 2 grilled pieces of meat, a tomato'
          styles='recipe_title_3'
        />


      </div>
    </div>
  )
}

export default Trending