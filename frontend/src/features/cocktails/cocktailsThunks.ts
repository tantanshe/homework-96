import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Cocktail} from '../../types';

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetchCocktails',
  async () => {
    const response = await axiosApi.get('/cocktails');
    return response.data;
  }
);

export const fetchUserCocktails = createAsyncThunk<Cocktail[]>(
  'cocktails/fetchUserCocktails',
  async () => {
    const response = await axiosApi.get('/cocktails/myCocktails');
    return response.data;
  }
);

export const fetchCocktailById = createAsyncThunk<Cocktail, string>(
  'cocktails/fetchCocktailById',
  async (cocktailId) => {
    const response = await axiosApi.get(`/cocktails/${cocktailId}`);
    return response.data;
  }
);

export const addCocktail = createAsyncThunk<Cocktail, Cocktail>(
  'cocktails/addCocktail',
  async (cocktailData) => {
    const formData = new FormData();
    formData.append('name', cocktailData.name);
    formData.append('recipe', cocktailData.recipe);
    formData.append('ingredients', JSON.stringify(cocktailData.ingredients));
    if (cocktailData.image) {
      formData.append('image', cocktailData.image);
    }
    const response = await axiosApi.post('/cocktails', formData);
    return response.data;
  }
);

export const deleteCocktail = createAsyncThunk<void, string>(
  'cocktails/deleteCocktail',
  async (cocktailId) => {
    await axiosApi.delete(`/cocktails/${cocktailId}`);
  }
);

export const updateCocktail = createAsyncThunk<Cocktail, string>(
  'cocktails/updateCocktail',
  async (cocktailId) => {
    const response = await axiosApi.patch(`/cocktails/${cocktailId}/togglePublished`);
    return response.data;
  }
);
