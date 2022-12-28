import React, { } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EditProfileFields from './EditProfileFields';

const EditProfile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 600,
              marginTop: 10
            }}
          >
            <EditProfileFields />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
export default EditProfile