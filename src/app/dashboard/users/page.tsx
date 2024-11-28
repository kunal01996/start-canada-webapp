import React from 'react';
import UserList from '../../../components/UserList';
import { Container, Grid, Typography } from '@mui/material';
import AddUser from './Add';

const UsersPage = () => {
  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Users
          </Typography>
        </Grid>
        <Grid item>
          <AddUser />
        </Grid>
      </Grid>
      <UserList />
    </Container>
  );
};

export default UsersPage;
