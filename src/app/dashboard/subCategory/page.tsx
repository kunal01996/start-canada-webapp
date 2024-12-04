"use client"

import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import SubCategoryList from '@/components/SubCategoryList';
import AddSubCategory from './Add';
import { GenerateNotification } from '@/components/Notification';

const SubCategory = () => {

  const [notificaton, setNotification] = useState<Notification.SuccessNotification | Notification.ErrorNotification | null>(null)
  const [reloadKey, setReloadKey] = useState(0);

  const [subCategoryToEdit, setSubCategoryToEdit] = useState<Database.QuizSubcategory | null>()

  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Sub-Catgegory
          </Typography>
        </Grid>
        <Grid item>
          <AddSubCategory setNotification={setNotification} notification={notificaton} setReload={() => setReloadKey(reloadKey + 1)} />
        </Grid>
      </Grid>
      {
        notificaton ? <Box mb={3}><GenerateNotification notification={notificaton} /></Box> : null
      }
      {
        subCategoryToEdit ? (
          <AddSubCategory setNotification={setNotification} notification={notificaton} setReload={() => setReloadKey(reloadKey + 1)} subCatToEdit={subCategoryToEdit} setSubCatToEdit={(value: Database.QuizSubcategory | null) => setSubCategoryToEdit(value)} />
        ) : null
      }
      <SubCategoryList reloadKey={reloadKey} setToEdit={(data: Database.QuizSubcategory | null) => setSubCategoryToEdit(data)} />
    </Container>
  );
};

export default SubCategory;
