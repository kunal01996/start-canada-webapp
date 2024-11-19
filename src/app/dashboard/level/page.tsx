import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import LevelList from '@/components/LevelList';
import AddIcon from '@mui/icons-material/Add';
import AddLevel from './Add';

const Level = () => {
  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Level
          </Typography>
        </Grid>
        <Grid item>
          <AddLevel />
        </Grid>
      </Grid>
      <LevelList />
    </Container>
  );
};

export default Level;
