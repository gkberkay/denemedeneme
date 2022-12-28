import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import HTTP from '../../main-source/MainSource'


export default function Country() {

    const [datas, setDatas] = useState([])
    useEffect(() => {
        HTTP.get('/mongo/query/vU1')
            .then(function (response) {
                setDatas(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }, [])
    return (

        <React.Fragment>
            <Title >Ziyaretçiler</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Ülke</TableCell>
                        <TableCell>Farklı Ziyaretçi</TableCell>

                        <TableCell align="right">Toplam Ziyaret Sayısı</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datas.map((row) => (
                        <TableRow key={row.country}>
                            <TableCell><a href={`${row.country}`}>{`${row.country}`}</a> </TableCell>
                            <TableCell>{row.userCount}</TableCell>
                            <TableCell align="right">{row.totalVisit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>

    );
}