import React, {useState} from 'react';
import {TextField, Button, Typography, IconButton} from '@mui/material';
import {useNavigate, Navigate} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addCocktail} from './cocktailsThunks';
import FileInput from '../../UI/FileInput/FileInput';
import {Cocktail} from '../../types';
import {selectUser} from '../users/usersSlice';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const AddCocktail: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<Cocktail>({
    name: '',
    recipe: '',
    ingredients: [{name: '', amount: ''}],
    image: null,
    isPublished: false,
  });

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleIngredientChange = (index: number, field: 'name' | 'amount', value: string) => {
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[index][field] = value;
    setState({...state, ingredients: updatedIngredients});
  };

  const addIngredient = () => {
    setState((prevState) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, {name: '', amount: ''}],
    }));
  };

  const removeIngredient = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !user) return;

    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('recipe', state.recipe);
    formData.append('user', user._id);
    if (state.image) {
      formData.append('image', state.image);
    }
    state.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][amount]`, ingredient.amount);
    });


    dispatch(addCocktail(formData))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Failed to add cocktail:', error);
      });
  };

  return (
    <>
      {user ? (
        <div>
          <Typography variant="h4">Add New Cocktail</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={state.name}
              onChange={(e) => setState({...state, name: e.target.value})}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Recipe"
              value={state.recipe}
              onChange={(e) => setState({...state, recipe: e.target.value})}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
            />
            <FileInput
              onChange={fileInputChangeHandler}
              name="image"
              label="Upload Image"
            />
            <Typography variant="h6" sx={{mt: 3}}>Ingredients</Typography>
            {state.ingredients.map((ingredient, index) => (
              <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '15px'}}>
                <TextField
                  label="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <IconButton onClick={() => removeIngredient(index)}>
                  <RemoveCircleIcon/>
                </IconButton>
              </div>
            ))}
            <Button variant="outlined" onClick={addIngredient} sx={{mt: 2, mr: 3}}>
              Add Ingredient
            </Button>
            <Button sx={{mt: 2}} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Navigate to="/login"/>
      )}
    </>
  );
};

export default AddCocktail;
