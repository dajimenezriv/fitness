// logic
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from 'services/users';
import { toast } from 'react-toastify';

// gui
import { Typography, Button, FormControl, TextField, InputAdornment } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// images
import fitness from 'assets/fitness.jpg';

// styles
import './Register.scss';

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const register = async () => {
    try {
      if (password !== repeatPassword) return toast.error('Las contraseñas deben coincidir');

      const res = await usersService.register({ username, email, password });
      localStorage.setItem('jwtToken', res.data.token);
      localStorage.setItem('username', res.data.username);
      return navigate('/profile');
    } catch (err: any) {
      return toast.error(err.response.data);
    }
  };

  return (
    <div className="Register">
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
            placeholder="Nombre de Usuario"
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
            data-cy="email"
            type="email"
            variant="outlined"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
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

          <TextField
            data-cy="repeat_password"
            type="password"
            variant="outlined"
            placeholder="Repetir Contraseña"
            onChange={(e) => setRepeatPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            data-cy="register_button"
            variant="contained"
            className="RegisterButton"
            onClick={register}>
            Registrarse
          </Button>

          <Button
            variant="contained"
            className="LoginButton"
            onClick={() => navigate('/login')}>
            Iniciar Sesión
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
