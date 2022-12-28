import React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Deposits({ props, onlineUser }) {


    return (

        <React.Fragment>
            <Title>{props}</Title>
            <Typography component="p" variant="h4">
                {onlineUser}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                30dk içinde güncellenir.
            </Typography>
        </React.Fragment>
    );
}