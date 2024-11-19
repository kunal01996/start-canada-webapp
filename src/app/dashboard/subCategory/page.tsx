import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import SubCategoryList from '@/components/SubCategoryList';
import AddIcon from '@mui/icons-material/Add';
import AddSubCategory from './Add';

const SubCategory = () => {
  return (
    <Container sx={{ marginTop: 10, marginBottom: 5 }}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Sub-Catgegory
          </Typography>
        </Grid>
        <Grid item>
          <AddSubCategory />
        </Grid>
      </Grid>
      <SubCategoryList />
    </Container>
  );
};

export default SubCategory;
