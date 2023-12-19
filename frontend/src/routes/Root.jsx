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

  // <Button color="inherit" onClick={handleLogout}>Cerrar sesion</Button>
  return (
    <>
      <table>
        <tr>
          <td><Avatar/></td>
          <td><Button color="inherit"  onClick={handleLogout}>Cerrar sesion</Button></td>
        </tr>
      </table>
      <Outlet />
    </>
  );
}

export default Root;
