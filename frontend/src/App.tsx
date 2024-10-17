import './App.css';
import {Container, Typography} from '@mui/material';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import CocktailDetails from './features/cocktails/CocktailDetails';
import CocktailsPage from './features/cocktails/CocktailsPage';
import MyCocktails from './features/cocktails/MyCocktails';
import AddCocktail from './features/cocktails/AddCocktail';
import Register from './features/users/Register';
import Login from './features/users/Login';

const App = () => {

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="lg" component="main">
        <Routes>
          <Route path="/" element={<CocktailsPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cocktails/:cocktailId" element={<CocktailDetails/>}/>
          <Route path="/myCocktails" element={<MyCocktails/>}/>
          <Route path="/addCocktail" element={<AddCocktail/>}/>
          <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;
