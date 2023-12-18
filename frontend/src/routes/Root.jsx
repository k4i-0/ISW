import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { AppBar, Button, Box, Avatar, Stack } from '@mui/material';
import * as React from 'react';
import '../index.css';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const { user } = useAuth();
  // <Button color="inherit" onClick={handleLogout}>Cerrar sesion</Button>
  return (
    <>
      <div className="container">
        <Avatar/>
        <Button color="inherit"  onClick={handleLogout}>Cerrar sesion</Button>
      </div>
      <Outlet />
    </>
  );
}

export default Root;
