import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chart from "react-google-charts";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Country from "./Country";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import HTTP from "../../main-source/MainSource";
import Title from "./Title";

ChartJS.register(ArcElement, Tooltip, Legend);

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



function UsersContent() {
  // harita data
  const [geo, setGeo] = useState([]);
  useEffect(() => {
    HTTP.get("/mongo/query/vU1")
      .then(function (response) {
        setGeo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  }, []);

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

  const [category, setCategory] = useState([]);
  useEffect(() => {
    HTTP.get("/mongo/query/vU24")
      .then(function (response) {
        setCategory(response.data);
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () { });
  }, []);

  var visitedCategory = category.map((categoryName) => categoryName.category);
  var visitedUsers = category.map((categoryName) => categoryName.userCount);
  const dataCategory = {
    labels: visitedCategory,
    datasets: [
      {
        label: "",
        data: visitedUsers,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // harita data
  const [device, setDevice] = useState([]);

  useEffect(() => {
    HTTP.get("/mongo/query/vU8")
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
  }, []);

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

  const [deneme, setDeneme] = useState(0);
  useEffect(() => {
    HTTP.get('/mongo/query/vU30')
      .then(function (response) {
        // handle success
        if (response.data.length == 0) {
          setDeneme(0)
        } else {
          setDeneme(response.data[0].count)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }, [])

  const [duration, setDuration] = React.useState([]);
  useEffect(() => {
    HTTP.get("/mongo/query/duration/now")
      .then(function (response) {
        // handle success
        setDuration(response.data);
        console.log("res",duration)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  var avgTime = duration.map((d) => d.averageTimeSpent);
  const minutes = Math.floor(avgTime / 60);
  const seconds = avgTime % 60;
  console.log("avg = ", avgTime);
  function padTo2Digits(num) {
    return num.toString().padStart(1, "0");
  }

  const optionsBarForDevice = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Cihaz Dağılımı",
      },
    },
  };
  const optionsBarForCategory = {
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 350,
            }}
          >
            <Deposits
              onlineUser={deneme}
              props={"Aktif Kullanıcı Sayısı"}
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
              height: "auto"
            }}
          >
            <Title>Anlık Kategoriler</Title>
            <Bar options={optionsBarForCategory} data={dataCategory} />
          </Paper>
        </Grid>
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
            <Title>Ortalama Geçirilen Süre ( Kişi / Sayfada Kalma Zamanı )</Title>{" "}
            <Typography variant="h4">
              {` ${padTo2Digits(minutes)} dk. ${Math.floor(
                padTo2Digits(seconds)
              )} sn.`}{" "}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
          <Paper
            sx={{
              p: 1,
              paddingBottom: 6,
              display: "flex",
              flexDirection: "column",
              maxHeight: 350,
              height: "auto",
            }}
          >
            <Title>Cihaz Dağılımı</Title>
            <Bar options={optionsBarForDevice} data={data} />
          </Paper>
        </Grid>

        {/* HARİTA */}
        <Grid item xs={12} lg={6} md={12}>
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

        {/* HARİTA */}

        {/* Ziyaretçi tablo*/}

        <Grid item xs={12} lg={6} md={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
          >
            <Country></Country>
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default function ActiveUsers() {
  return <UsersContent />;
}
