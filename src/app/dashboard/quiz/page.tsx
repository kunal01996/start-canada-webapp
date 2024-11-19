import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import QuizList from '@/components/QuizList';
import AddIcon from '@mui/icons-material/Add';
import AddQuiz from './Add';

const Quiz = () => {
  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Quiz
          </Typography>
        </Grid>
        <Grid item>
          <AddQuiz />
        </Grid>
      </Grid>
      <QuizList />
    </Container>
  );
};

export default Quiz;
