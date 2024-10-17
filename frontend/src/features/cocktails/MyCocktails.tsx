import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchUserCocktails} from './cocktailsThunks';
import {selectUserCocktails, selectIsCocktailsLoading, selectCocktailsError} from './cocktailsSlice';
import {CircularProgress, Typography, Card, CardContent, CardMedia, Grid} from '@mui/material';
import {Link} from 'react-router-dom';

const MyCocktails: React.FC = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectUserCocktails);
  const loading = useAppSelector(selectIsCocktailsLoading);
  const error = useAppSelector(selectCocktailsError);

  useEffect(() => {
    dispatch(fetchUserCocktails());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress/>;
  }

  if (error) {
    return <Typography variant="h6">Error loading your cocktails.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>My Cocktails</Typography>
      {cocktails.length === 0 ? (
        <Typography variant="body1">You have not added any cocktails yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cocktails.map((cocktail) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cocktail._id}>
              <Link to={`/cocktails/${cocktail._id}`} style={{textDecoration: 'none'}}>
                <Card sx={{mb: 2}}>
                  <CardMedia
                    component="img"
                    alt={cocktail.name}
                    height="300"
                    image={cocktail.image ? `http://localhost:8000/${cocktail.image}` : ''}
                  />
                  <CardContent>
                    <Typography variant="h5">{cocktail.name}</Typography>
                    <Typography variant="body2">
                      {cocktail.isPublished ? 'This cocktail is published.' : 'Your cocktail is under review by the moderator.'}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default MyCocktails;