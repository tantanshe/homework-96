import React, {useState} from 'react';
import {RegisterMutation} from '../../types';
import {Avatar, Box, Button, Grid, TextField, Typography, Link, CircularProgress} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectRegisterError, selectRegisterLoading} from './usersSlice';
import {register} from './usersThunks';
import FileInput from '../../UI/FileInput/FileInput';

const Register = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading)
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    displayName: '',
    avatar: null,
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('displayName', state.displayName);
    if (state.avatar) {
      formData.append('avatar', state.avatar);
    }

    try {
      await dispatch(register(formData)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <CircularProgress/>;

  return (
    <Box sx={{
      mt: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Avatar sx={{
        m: 1,
        bgcolor: 'secondary.main',
      }}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              label="Email"
              name="email"
              autoComplete="new-email"
              value={state.email}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('email'))}
              helperText={getFieldError('email')}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Display Name"
              name="displayName"
              autoComplete="new-displayName"
              value={state.displayName}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('displayName'))}
              helperText={getFieldError('displayName')}
            />
            <FileInput
              onChange={fileInputChangeHandler}
              name="avatar"
              label="Upload avatar"
            />
          </Grid>
        </Grid>
        <Button type="submit" color="primary" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
          Sign up
        </Button>
        <Link component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
};

export default Register;