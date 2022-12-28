import React, {} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import EditPasswordField from '../resetPasswordProfile/EditPasswordField';


ChartJS.register(ArcElement, Tooltip, Legend);


const EditPassword = () => {

  // const [open, setOpen] = React.useState(true);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  // const [userProfile, setUserProfile] = React.useState(true);
  // const editToggle = () => {
  //   setUserProfile(userProfile => !userProfile);
  // };

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
                  <EditPasswordField />
                </Paper>
              </Grid>
            </Grid>
          </Container>
  );
}

export default EditPassword