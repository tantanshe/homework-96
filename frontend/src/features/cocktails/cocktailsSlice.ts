import {createSlice} from '@reduxjs/toolkit';
import {
  addCocktail,
  deleteCocktail,
  fetchCocktailById,
  fetchCocktails,
  fetchUserCocktails,
  updateCocktail,
} from './cocktailsThunks';
import {Cocktail} from '../../types';
import {RootState} from '../../app/store';

interface CocktailsState {
  cocktails: Cocktail[];
  userCocktails: Cocktail[];
  cocktail: Cocktail | null;
  loading: boolean;
  error: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  userCocktails: [],
  cocktail: null,
  loading: false,
  error: false,
};

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.cocktails = action.payload;
        state.loading = false;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(fetchUserCocktails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUserCocktails.fulfilled, (state, action) => {
        state.userCocktails = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCocktails.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(fetchCocktailById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCocktailById.fulfilled, (state, action) => {
        state.cocktail = action.payload;
        state.loading = false;
      })
      .addCase(fetchCocktailById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(addCocktail.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addCocktail.fulfilled, (state, action) => {
        state.cocktails.push(action.payload);
        state.loading = false;
      })
      .addCase(addCocktail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(deleteCocktail.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCocktail.fulfilled, (state, action) => {
        state.cocktails = state.cocktails.filter((cocktail) => cocktail._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(updateCocktail.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCocktail.fulfilled, (state, action) => {
        const index = state.cocktails.findIndex((cocktail) => cocktail._id === action.payload._id);
        if (index !== -1) {
          state.cocktails[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateCocktail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectUserCocktails = (state: RootState) => state.cocktails.userCocktails;
export const selectCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectIsCocktailsLoading = (state: RootState) => state.cocktails.loading;
export const selectCocktailsError = (state: RootState) => state.cocktails.error;

export const cocktailsReducer = cocktailsSlice.reducer;
