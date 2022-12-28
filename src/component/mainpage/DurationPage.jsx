import React, { useContext, useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../activeusersPage/Title';
import HTTP from '../../main-source/MainSource'
import AppContext from "../core/AppContext"
import { useApi } from '../core/hooks/useApi';
import Loader from "../loading/Loading"


function preventDefault(event) {
    event.preventDefault();
}

export default function DurationPage() {

    const { appState: { mainPageSelectedDate } } = useContext(AppContext)

    const { makeRequest, apiState: { isRequestPending, data: cengo } } = useApi();


    const [duration, setDuration] = useState([])
    useEffect(() => {
        makeRequest(HTTP.get(`/mongo/query/mostinteractedpage/${mainPageSelectedDate}`))
            .then(function (response) {
                // handle success
                setDuration(response.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [mainPageSelectedDate])

    return (
        <React.Fragment>
            <Title>En Çok Etkileşimi Olan Sayfalar</Title>
            {isRequestPending ? <Loader /> :
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Url</TableCell>
                            <TableCell>Ziyaret Sayısı</TableCell>

                            <TableCell align="right">Ortalama Geçirilen Süre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {duration.map((row) => (
                            <TableRow key={row.newsUrl}>
                                <TableCell><a href={`${row.newsUrl}`}>{`${row.newsUrl} `}</a> </TableCell>
                                <TableCell>{row.count}</TableCell>
                                <TableCell align="right">{Math.floor(row.avgTime)} sn</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                Diğerlerini Gör
            </Link>

        </React.Fragment>

    );
}