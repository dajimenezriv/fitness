// logic
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from 'services/users';
import { UserType } from 'data_types';

// gui
import { Button } from '@mui/material';

// styles
import './Profile.scss';

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<null | UserType>(null);

  const logout = async () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  useEffect(() => {
    usersService.getLoggedUser()
      .then((res) => setUser(res.data))
      .catch(() => logout());
  }, []);

  if (!user) return null;

  return (
    <div className="Profile">
      {user.username}

      <Button
        data-cy="logout_button"
        variant="contained"
        className="LogoutButton"
        onClick={logout}>
        CERRAR SESIÓN
      </Button>
    </div>
  );
}
