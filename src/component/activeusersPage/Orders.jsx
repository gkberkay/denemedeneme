import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import HTTP from '../../main-source/MainSource'

function preventDefault(event) {
    event.preventDefault();
}
export default function Orders() {
    const [datas, setDatas] = useState([])
    useEffect(() => {
        HTTP.get('/mongo/query/vU26')
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
            <Title>En Çok Okunan Haberler</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Haber Başlığı</TableCell>
                        <TableCell>Kategori</TableCell>
                        <TableCell align="right">Ziyaret Sayısı</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datas.map((row) => (
                        <TableRow key={row.newsTitle}>
                            <TableCell><a href={`${row.newsTitle}`}>{`${row.newsTitle}`}</a> </TableCell>
                            <TableCell>{row.subCategory}</TableCell>
                            <TableCell align="right">{row.totalCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                Diğerlerini Gör
            </Link>
        </React.Fragment>
    );
}