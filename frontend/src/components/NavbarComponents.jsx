import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SpaIcon from '@mui/icons-material/Spa';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import axiosClient from '../config/axios';

const pages = [
  { name: 'HOME', path: '/', icon: <HomeIcon sx={{mr:1}} /> },
  { name: 'SERVICIOS', path: '/servicios', icon: <ListAltIcon sx={{mr:1}} /> },
  { name: 'ACERCA DE NOSOTROS', path: '/about', icon: <InfoIcon sx={{mr:1}} /> },
  { name: 'PERFIL', path: '/profile', icon: <AccountCircleIcon sx={{mr:1}} /> },
  { name: 'LOGIN', path: '/login', icon: <LoginIcon sx={{mr:1}} /> },
  { name: 'SIGNUP', path: '/signup', icon: <PersonAddIcon sx={{mr:1}} /> },
  { name: 'ADMIN SERVICIOS', path: '/admin/servicios', icon: <ListAltIcon sx={{mr:1}} /> }
];

function NavbarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [pendingCount, setPendingCount] = React.useState(0);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosClient.get('/reservations', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const pending = res.data.reservations?.filter(r => r.status === 'pendiente').length || 0;
        setPendingCount(pending);
      }).catch(() => setPendingCount(0));
    }
  }, []);

  // Actualiza el contador de reservas pendientes cada vez que cambia la ruta o tras acciones relevantes
  React.useEffect(() => {
    const updatePending = () => {
      const token = localStorage.getItem('token');
      if (token) {
        axiosClient.get('/reservations', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
          const pending = res.data.reservations?.filter(r => r.status === 'pendiente').length || 0;
          setPendingCount(pending);
        }).catch(() => setPendingCount(0));
      }
    };
    updatePending();
    window.addEventListener('reservationsChanged', updatePending);
    return () => window.removeEventListener('reservationsChanged', updatePending);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
    window.location.reload();
  };

  // Solo mostrar la opción de admin si el usuario es admin
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';

  const filteredPages = pages.filter(page => {
    if (page.name === 'PERFIL') return isLoggedIn;
    if (page.name === 'ADMIN SERVICIOS') return isAdmin;
    if (page.name === 'LOGIN' || page.name === 'SIGNUP') return !isLoggedIn;
    return true;
  });

  return (
    <AppBar position="static" sx={{backgroundColor: '#003366', boxShadow: '0 2px 8px #00336633'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SpaIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOVILIZA
          </Typography>
          {/* MENÚ VERSIÓN MÓVIL */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {filteredPages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.path}
                    sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                  >
                    {page.icon}{page.name}
                  </Typography>
                </MenuItem>
              ))}
              {isLoggedIn && (
                <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                  <LogoutIcon sx={{mr:1}} />Logout
                </MenuItem>
              )}
            </Menu>
          </Box>
          <SpaIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VC
          </Typography>
          {/* MENÚ VERSIÓN DESKTOP */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {filteredPages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#fff', display: 'flex', alignItems: 'center', fontWeight: 600, letterSpacing: 1, '&:hover': { color: '#0072ce', background: '#e6f0fa' } }}
              >
                {page.icon}{page.name}
              </Button>
            ))}
            {isLoggedIn && (
              <>
                <IconButton color="inherit" component={Link} to="/profile" sx={{ ml: 2 }}>
                  <Badge badgeContent={pendingCount} color="error" showZero>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Button
                  onClick={handleLogout}
                  sx={{ my: 2, color: '#fff', display: 'flex', alignItems: 'center', fontWeight: 600, letterSpacing: 1, ml: 2, '&:hover': { color: '#0072ce', background: '#e6f0fa' } }}
                >
                  <LogoutIcon sx={{mr:1}} />Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent;
