// logic
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// gui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';

// images
import icon from 'assets/icon.png';
// import user from 'assets/user.jpg';

// styles
import './Navbar.scss';

const pages = { Alimentos: 'foods', Menus: 'menus' };

export default function Navbar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const username = localStorage.getItem('username');

  const openProfile = () => {
    if (username) navigate('/profile');
    else navigate('/login');
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              alt="icon"
              src={icon}
              width="40"
              height="40"
              className="Icon"
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => setAnchorElNav(e.currentTarget)}
                color="inherit">
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}>
                {Object.entries(pages).map(([title, url]) => (
                  <MenuItem
                    key={url}
                    onClick={() => setAnchorElNav(null)}>
                    <Typography textAlign="center">
                      <Link to={`/${url}`}>{title}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <div className="Links">
                {Object.entries(pages).map(([title, url]) => (
                  <Button
                    key={url}
                    onClick={() => setAnchorElNav(null)}>
                    <Link to={`/${url}`}>{title}</Link>
                  </Button>
                ))}
              </div>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={openProfile}
                color="inherit">
                <AccountCircle />
              </IconButton>
              {' '}
              {username}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
