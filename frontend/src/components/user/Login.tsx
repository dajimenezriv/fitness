// logic
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from 'services/users';
import { toast } from 'react-toastify';

// gui
import { Typography, Button, FormControl, TextField, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

// images
import fitness from 'assets/fitness.jpg';

// styles
import './Login.scss';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await usersService.login({ username, email: '', password });
      localStorage.setItem('jwtToken', res.data.token);
      localStorage.setItem('username', res.data.username);
      return navigate('/profile');
    } catch (err: any) {
      return toast.error(err.response.data);
    }
  };

  return (
    <div className="Login">
      <div className="Image">
        <img
          src={fitness}
          alt="background"
        />
      </div>

      <div className="Form">
        <FormControl>
          <Typography
            variant="h1"
            component="h2">
            Bienvenido
          </Typography>

          <TextField
            data-cy="username"
            type="text"
            variant="outlined"
            placeholder="Usuario"
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            data-cy="password"
            type="password"
            variant="outlined"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            data-cy="login_button"
            variant="contained"
            className="LoginButton"
            onClick={login}>
            Iniciar Sesión
          </Button>

          <Button
            variant="contained"
            className="RegisterButton"
            onClick={() => navigate('/register')}>
            Registrarse
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
