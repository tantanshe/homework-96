import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCocktails, selectIsCocktailsLoading, selectCocktailsError} from './cocktailsSlice';
import {deleteCocktail, fetchCocktails, updateCocktail} from './cocktailsThunks';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Button
} from '@mui/material';
import {Link, Navigate} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {selectUser} from '../users/usersSlice';

const CocktailsPage: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectIsCocktailsLoading);
  const error = useAppSelector(selectCocktailsError);
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  if (loading) return <CircularProgress/>;
  if (error) return <Alert severity="error">Error loading cocktails</Alert>;

  const handleDelete = async (cocktailId: string) => {
    await dispatch(deleteCocktail(cocktailId));
    await dispatch(fetchCocktails());
  };

  const handlePublish = async (cocktailId: string) => {
    await dispatch(updateCocktail(cocktailId));
    await dispatch(fetchCocktails());
  };

  return (
    <>
      {user ? (
        <Grid container spacing={2} justifyContent="center">
          {cocktails.length > 0 ? (
            cocktails.map((cocktail) => (
              <Grid item key={cocktail._id} xs={12} sm={6} md={4} lg={3} sx={{mt: 4}}>
                <Card style={{width: '100%'}}>
                  <Link to={`/cocktails/${cocktail._id}`} style={{textDecoration: 'none'}}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:8000/${cocktail.image}`}
                      alt={cocktail.name}
                      style={{objectFit: 'cover'}}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {cocktail.name}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardContent>
                    {!cocktail.isPublished && (
                      <Typography variant="body2" color="error" sx={{mb: 2}}>
                        Unpublished
                      </Typography>
                    )}
                    {cocktail._id && isAdmin && (
                      <>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(cocktail._id)}>
                          Delete
                        </Button>
                        {!cocktail.isPublished && (
                          <Button variant="contained" color="primary" onClick={() => handlePublish(cocktail._id)}
                                  sx={{ml: 1}}>
                            Publish
                          </Button>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{mt: 4}}>
              No cocktails available.
            </Typography>
          )}
        </Grid>
      ) : (
        <Navigate to="/register"/>
      )}
    </>
  );
};

export default CocktailsPage;