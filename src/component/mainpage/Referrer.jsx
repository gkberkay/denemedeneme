import React, { useContext, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import HTTP from '../../main-source/MainSource';
import AppContext from "../core/AppContext";
import Loader from "../loading/Loading"
import { useApi } from '../core/hooks/useApi';




export default function Country() {



    const { appState: { mainPageSelectedDate } } = useContext(AppContext)

    const { makeRequest, apiState: { isRequestPending, data: cengo } } = useApi();



    const [datas, setDatas] = useState([])
    useEffect(() => {
        makeRequest(HTTP.get(`/mongo/query/referrervisitor/${mainPageSelectedDate}`))
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
        <>

            <React.Fragment>
                <Title >Yönlendirilen Ziyaretçiler</Title>
                {isRequestPending ? <Loader /> :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nereden Geldiği</TableCell>
                                <TableCell>Farklı Ziyaretçi</TableCell>
                                <TableCell align="right">Toplam Ziyaret Sayısı</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datas.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell><a href={`${row._id}`}>{`${row._id}`}</a></TableCell>
                                    <TableCell>{row.uniqueUser}</TableCell>
                                    <TableCell align="right">{row.totalCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </React.Fragment>

        </>
    );
}