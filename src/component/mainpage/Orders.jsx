import React, { useContext, useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import HTTP from '../../main-source/MainSource'
import AppContext from "../core/AppContext"
import { useApi } from '../core/hooks/useApi';
import Loader from "../loading/Loading"
import "./orders.css"


function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {

    const { makeRequest, apiState: { isRequestPending, data: cengo } } = useApi();


    const { appState: { mainPageSelectedDate } } = useContext(AppContext)


    const [datas, setDatas] = useState([])

    useEffect(() => {
        makeRequest(HTTP.get(`/mongo/query/mostpopularnews/${mainPageSelectedDate}`))
            .then(function (response) {
                // handle success
                setDatas(response.data)
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
            <Title>En Çok Okunan Haberler</Title>
            {isRequestPending ? <Loader /> :
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
                                <TableCell><a href={`http://localhost:53227/${row.category === undefined ? "" : row.category + "/"}${row.subCategory === undefined ? "/" : row.subCategory}${"/" + row.newsTitle}`} target='_blank' rel="noopener noreferrer" >{`${row.category === undefined ? "" : "/" + row.category}${row.subCategory === undefined ? "/" : "/" + row.subCategory}${"/" + row.newsTitle}`}</a> </TableCell>
                                <TableCell>{row.subCategory}</TableCell>
                                <TableCell align="right">{row.totalCount}</TableCell>
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