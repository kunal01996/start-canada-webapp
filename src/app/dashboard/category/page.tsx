"use client"

import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CategoryList from '@/components/CategoryList';
import AddCategory from './Add';
import { GenerateNotification } from '@/components/Notification';

const Category = () => {

  const [notificaton, setNotification] = useState<Notification.SuccessNotification | Notification.ErrorNotification | null>(null)
  const [reloadKey, setReloadKey] = useState(0);

  const [categoryToEdit, setCategoryToEdit] = useState<Database.QuizCategory | null>()

  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Category
          </Typography>
        </Grid>
        <Grid item>
          <AddCategory setNotification={setNotification} notification={notificaton} setReload={() => setReloadKey(reloadKey + 1)} />
        </Grid>
      </Grid>
      {
        notificaton ? <Box mb={3}><GenerateNotification notification={notificaton} /></Box> : null
      }
      {
        categoryToEdit ? (
          <AddCategory setNotification={setNotification} notification={notificaton} setReload={() => setReloadKey(reloadKey + 1)} catToEdit={categoryToEdit} setCatToEdit={(value: Database.QuizCategory | null) => setCategoryToEdit(value)} />
        ) : null
      }
      <CategoryList reloadKey={reloadKey} setToEdit={(data: Database.QuizCategory) => setCategoryToEdit(data)} />
    </Container>
  );
};

export default Category;
