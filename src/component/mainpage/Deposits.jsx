import React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import DropDownBox from '../dropdownBox/DropDownBox';
import { LineCharts } from '../charts/LineCharts';
import { useApi } from '../core/hooks/useApi';
import Loader from "../loading/Loading"



// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Deposits({ props, onlineUser }) {

    const { makeRequest, apiState: { isRequestPending, data: cengo } } = useApi();

    {/* <Typography component="p" variant="h4">
            {onlineUser}
        </Typography> */}
    {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
            30dk içinde güncellenir.
        </Typography> */}

    return (
        <React.Fragment>
            <Title>{props}</Title>

            {isRequestPending ? <Loader /> :

                <Typography>
                    <LineCharts />
                </Typography>


            }
        </React.Fragment>

    );
}