import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchCocktailById} from './cocktailsThunks';
import {selectCocktail, selectIsCocktailsLoading, selectCocktailsError} from './cocktailsSlice';
import {CircularProgress, Typography, Card, CardContent, CardMedia, ListItem, Paper, List} from '@mui/material';

const CocktailDetails: React.FC = () => {
  const {cocktailId} = useParams<{ cocktailId: string }>();
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectCocktail);
  const loading = useAppSelector(selectIsCocktailsLoading);
  const error = useAppSelector(selectCocktailsError);

  useEffect(() => {
    if (cocktailId) {
      dispatch(fetchCocktailById(cocktailId));
    }
  }, [cocktailId, dispatch]);

  if (loading) {
    return <CircularProgress/>;
  }

  if (error) {
    return <Typography variant="h6">Error loading cocktail details.</Typography>;
  }

  if (!cocktail) {
    return <Typography variant="h6">Cocktail not found.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{padding: 3, margin: 2}}>
      <Typography variant="h4" gutterBottom>
        {cocktail.name}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          alt={cocktail.name}
          height="300"
          sx={{ objectFit: 'contain' }}
          image={`http://localhost:8000/${cocktail.image}`}
        />
        <CardContent>
          <Typography variant="body1">{cocktail.recipe}</Typography>
          <Typography variant="h6" sx={{mt: 2}}>Ingredients:</Typography>
          <List>
            {cocktail.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                {ingredient.name}: {ingredient.amount}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default CocktailDetails;
