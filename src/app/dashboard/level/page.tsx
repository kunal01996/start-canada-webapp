"use client"

import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import LevelList from '@/components/LevelList';
import AddLevel from './Add';
import { GenerateNotification } from '@/components/Notification';

const Level = () => {

  const [notificaton, setNotification] = useState<Notification.SuccessNotification | Notification.ErrorNotification | null>(null)
  const [reloadKey, setReloadKey] = useState(0);

  const [levelToEdit, setLevelToEdit] = useState<Database.QuizLevel | null>()

  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Level
          </Typography>
        </Grid>
        <Grid item>
          <AddLevel setNotification={setNotification} notification={notificaton} setReload={() => setReloadKey(reloadKey + 1)} />
        </Grid>
      </Grid>
      {
        notificaton ? <Box mb={3}><GenerateNotification notification={notificaton} /></Box> : null
      }
      {
        levelToEdit ? (
          <AddLevel setNotification={setNotification} notification={notificaton} setReload={() => setReloadKey(reloadKey + 1)} levelToEdit={levelToEdit} setLevelToEdit={(value: Database.QuizLevel | null) => setLevelToEdit(value)} />
        ) : null
      }
      <LevelList reloadKey={reloadKey} setToEdit={(data: Database.QuizLevel) => setLevelToEdit(data)} />
    </Container>
  );
};

export default Level;
