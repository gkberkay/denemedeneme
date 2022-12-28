import React, { useContext, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import HTTP from "../../main-source/MainSource";
import AppContext from '../core/AppContext';
import { useApi } from '../core/hooks/useApi';
import Loader from "../loading/Loading"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    }
};

//FOR 90 DAY --START
const chartLabelArr90Days = [];
for (let i = 0; i <= 3; i++) {
    const currentTime = new Date();
    currentTime.setDate(
        currentTime.getDate() - (30 * i)
    )
    var convertedMonth = currentTime.toLocaleString('tr-TR', { month: 'long' })
    var globalDay = currentTime.getDate();

    chartLabelArr90Days.push(globalDay + " " + convertedMonth)
}
chartLabelArr90Days.reverse();

//FOR 28 DAY --START
const chartLabelArr28Days = [];
for (let i = 0; i < 5; i++) {

    const currentTime = new Date();
    currentTime.setDate(
        currentTime.getDate() - (7 * i)
    )
    var convertedMonth = currentTime.toLocaleString('tr-TR', { month: 'long' })
    var globalDay = currentTime.getDate();

    chartLabelArr28Days.push(globalDay + " " + convertedMonth)
}
chartLabelArr28Days.reverse();

//FOR 7 DAY --START
const chartLabelArr7Days = [];
for (let i = 0; i < 7; i++) {

    const currentTime = new Date();
    currentTime.setDate(
        currentTime.getDate() - (1 * i)
    )
    var convertedMonth = currentTime.toLocaleString('tr-TR', { month: 'long' })
    var globalDay = currentTime.getDate();

    chartLabelArr7Days.push(globalDay + " " + convertedMonth)
}
chartLabelArr7Days.reverse();

//FOR 1 DAY --START
const chartLabelArrYesterday = [];

//FOR 0 DAY --START
const chartLabelArrDaily = [];
var currentTime = new Date(Date.now())
const weekday = new Array(7);
weekday[0] = "Pazar";
weekday[1] = "Pazartesi";
weekday[2] = "Salı";
weekday[3] = "Çarşamba";
weekday[4] = "Perşembe";
weekday[5] = "Cuma";
weekday[6] = "Cumartesi";

let startDate = new Date();
startDate.setHours(0, 0, 0, 0);

let endDate = new Date();
endDate.setHours(23, 0, 0, 0);

var convertedDay; //arrayin içindeki numberları string yazdırıyor
var hours; //saati getiriyor
var globalDay; //günü getiriyor

for (let i = 0; i < 24; i++) {
    let currentDate = new Date(startDate);
    currentDate.setHours(currentDate.getHours() + (i));
    convertedDay = weekday[currentTime.getDay()]
    hours = currentDate.getHours();
    globalDay = currentDate.getDay();
    chartLabelArrDaily.push(hours)
    chartLabelArrYesterday.push(hours)
}

export function LineCharts() {

    const { makeRequest, apiState: { isRequestPending, data: cengo } } = useApi();

    const [chartData, setChartData] = useState("");
    const { appState: { mainPageSelectedDate } } = useContext(AppContext)

    useEffect(() => {
        (async () => {
            const response = await makeRequest(HTTP.get(`/mongo/query/users/${mainPageSelectedDate}`));
            setChartData(response.data[0].users);
        })()
    }, [mainPageSelectedDate]);

    const data = {
        labels: (mainPageSelectedDate == "daily" ? chartLabelArrDaily : mainPageSelectedDate == "yesterday" ? chartLabelArrYesterday : mainPageSelectedDate == "last7days" ? chartLabelArr7Days : mainPageSelectedDate == "last28days" ? chartLabelArr28Days : mainPageSelectedDate == "last90days" ? chartLabelArr90Days : []),
        datasets: [
            {
                label: 'Kullanıcılar',
                data: Object.values(chartData).map(item => item.uniqueUsers),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return isRequestPending ? <Loader /> : <Line options={options} data={data} />
};

