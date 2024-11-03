import React from 'react';

// src/app/dashboard/users/page.tsx
import UserList from '../../../components/UserList';
import { Container, Typography } from '@mui/material';

const UsersPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        User List
      </Typography>
      <UserList />
    </Container>
  );
};

export default UsersPage;
