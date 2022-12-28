import React, { useContext, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "react-google-charts";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Country from "./Country";
import DurationPage from "./DurationPage";
import DropDownBox from "../dropdownBox/DropDownBox"
import AppContext from "../core/AppContext"
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Referrer from "./Referrer"
import HTTP from "../../main-source/MainSource";
import Title from "./Title";
import { useApi } from '../core/hooks/useApi';
import Loader from "../loading/Loading"


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);


function DashboardContent() {

  const { makeRequest, apiState: { isRequestPending, data: cengo } } = useApi();

  const { appState: { mainPageSelectedDate } } = useContext(AppContext)


  const optionsForMap = {
    colorAxis: { colors: ["#83b4c0", "#00637c"] },
    backgroundColor: "#fff",
    datalessRegionColor: "#bfc0c0",
    defaultColor: "#f5f5f5",
  };
  const optionsForMap1 = {
    colorAxis: { colors: ["#bfc0c0", "#bfc0c0"] },
    backgroundColor: "#fff",
    datalessRegionColor: "#bfc0c0",
    defaultColor: "#f5f5f5",
  };

  const [geo, setGeo] = useState([]);

  useEffect(() => {
    HTTP.get(`/mongo/query/map/${mainPageSelectedDate}`)
      .then(function (response) {
        // handle success
        setGeo(response.data);

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPageSelectedDate]);


  let results = [
    ["Country", "User Count", "Total Visit"]
  ];
  if (geo.length > 0) {
    geo.forEach(element => {
      let country = element.country;
      let popularity = element.userCount;
      let totalVisit = element.totalVisit;

      results.push([country, popularity, totalVisit]);
    });
  }
  else {
    results.push(["country", 0, 0]);
  }
  //Harita için option burdan geliyor.
  const options = {
    colorAxis: { colors: ["#83b4c0", "#00637c"] },
    backgroundColor: "#fff",
    datalessRegionColor: "#bfc0c0",
    defaultColor: "#f5f5f5",
  };
  // harita data
  const [chartData, setChartData] = useState("");
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Kategori Dağılımı",
      },
    },
  };
  useEffect(() => {
    (async () => {
      const response = await HTTP.get(`/mongo/query/category/${mainPageSelectedDate}`);
      setChartData(response.data);
    })()
  }, [mainPageSelectedDate]);


  const dataCategory = {
    labels: Object.values(chartData).map(item => item.subCategory === null ? 0 : item.subCategory),
    datasets: [
      {
        label: '',
        data: Object.values(chartData).map(item => item.uniqueUsers === null ? 0 : item.uniqueUsers),
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
      },
    ],
  };



  //Cihaz Dağılımı BAŞLANGIÇ
  const [device, setDevice] = useState([]);
  useEffect(() => {
    HTTP.get(`mongo/query/device/${mainPageSelectedDate}`)
      .then(function (response) {
        // handle success
        setDevice(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [mainPageSelectedDate]);

  var deviceType = device.map((mert) => mert._id);
  var deviceCount = device.map((mert) => mert.uniqueUser);
  const data = {
    labels: deviceType,
    datasets: [
      {
        label: "",
        data: deviceCount,
        backgroundColor: ["red", "blue", "black", "orange", "brown"],
        borderColor: ["white", "white", "white", "white", "white"],
        borderWidth: 1,
      },
    ],
  };
  //Cihaz Dağılımı BİTİŞ


  const [deneme, setDeneme] = useState(0);
  useEffect(() => {
    HTTP.get("/mongo/query/v30")
      .then(function (response) {
        // handle success
        setDeneme(response.data[0].count);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  //! Duration 
  const [duration, setDuration] = React.useState([]); useEffect(() => {
    HTTP.get(`/mongo/query/duration/${mainPageSelectedDate}`)
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

  var avgTime = duration.map((d) => d.averageTimeSpent);
  const minutes = Math.floor(avgTime / 60);
  const seconds = avgTime % 60;
  console.log("avg = ", avgTime);
  function padTo2Digits(num) {
    return num.toString().padStart(1, "0");
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <DropDownBox dropDownBoxStyle={{ width: 240, paddingBottom: 15 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: 550,
              maxHeight: "auto"
            }}
          >
            <Deposits
              onlineUser={deneme}
              props={"Toplam Kullanıcı Sayısı"}
            />
          </Paper>
        </Grid>

        {/* Recent Deposits */}
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 350,
              height: "auto",
            }}
          >
            <Title>Popüler Kategoriler</Title>
            <Bar options={optionsBar} data={dataCategory} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 1,
              // paddingBottom: 6,
              display: "flex",
              flexDirection: "column",
              minHeight: 350,
              height: "auto",
            }}
          >
            <Title>Cihaz Dağılımı</Title>
            <Bar options={optionsBar} data={data} />
          </Paper>
        </Grid>


        {/* HARİTA */}
        <Grid item xs={12} lg={6} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
          >
            <Title>Ziyaretçi Dağılımı</Title>
            <Chart
              chartEvents={[
                {
                  eventName: "select",
                  callback: ({ chartWrapper }) => {
                    const chart = chartWrapper.getChart();
                    const selection = chart.getSelection();
                    if (selection.length === 0) return;
                    // const region = data[selection[0].row + 1];
                  },
                },
              ]}
              chartType="GeoChart"
              data={results}
              options={geo.length > 0 ? optionsForMap : optionsForMap1}
            />
          </Paper>
        </Grid>


        {/* Ziyaretçiler*/}

        <Grid item xs={12} lg={6} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
          >
            <Country />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: "auto",
              height: "auto",
            }}
          >
            <Title>Ortalama Geçirilen Süre ( Kişi /Sayfada Kalma Zamanı )</Title>{" "}
            <Typography variant="h4">
              {` ${padTo2Digits(minutes)} dk. ${Math.floor(
                padTo2Digits(seconds)
              )} sn.`}{" "}
            </Typography>
          </Paper>
        </Grid>

        {/* Referrer alanı */}
        <Grid item xs={12} lg={12} md={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <Referrer />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <DurationPage />
          </Paper>
        </Grid>
      </Grid>
    </Container >





  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
