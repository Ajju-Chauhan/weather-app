import React, { useRef, useEffect, useState } from "react";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Application = () => {
  const cityNameRef = useRef();
  const [citydata, setCitydata] = useState(null);
  const [loading, setLoading] = useState(false);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let city = cityNameRef.current.value;
      let url = `https://api.weatherapi.com/v1/forecast.json?key=532548d4220c4adcb5842353242003&q=${city}&days=1&aqi=no&alerts=no`;
      let response = await fetch(url);
      let data = await response.json();
      setCitydata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCitydata(null);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = debounce(fetchData, 1000); // 500ms debounce delay

  useEffect(() => {
    if (cityNameRef.current) {
      cityNameRef.current.addEventListener("input", debouncedFetchData);
    }

    return () => {
      if (cityNameRef.current) {
        cityNameRef.current.removeEventListener("input", debouncedFetchData);
      }
    };
  }, [debouncedFetchData]);

  useEffect(() => {
    if (citydata) {
      cityNameRef.current.value = "";
    }
  }, [citydata]);

  return (
    <>
      <Header />
      <Stack
        sx={{
          width: "100%",
          textAlign: "center",
          margin: "auto",
          marginTop: "22px",
        }}
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          label="Enter location"
          variant="outlined"
          inputRef={cityNameRef}
        />
      </Stack>
      {loading && (
        <Stack
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: "22px",
          }}
        >
          <Typography variant="body1">Loading...</Typography>
        </Stack>
      )}
      {citydata && (
        <Stack>
          <Typography variant="h4" textAlign="center">
            {citydata.location.name}, {citydata.location.country}
          </Typography>
          <Card
            sx={{
              width: { xs: "90%", sm: "40%" },
              minWidth: { xs: "90%", sm: "40%" },
              textAlign: "center",
              margin: "auto",
              marginTop: "22px",
            }}
          >
            <CardMedia
              component="img"
              height="100"
              width="100"
              image={citydata.current.condition.icon} // Replace with actual image URL
              alt="Weather Image"
              sx={{ height: "100px", width: "100px" }}
            />
            <CardContent>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent={"space-between"}
              >
                <Typography>Tempreature</Typography>
                <Typography>
                  {citydata.current.temp_c}°C / {citydata.current.temp_f}°F
                </Typography>
              </Stack>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent={"space-between"}
              >
                <Typography>Condition</Typography>
                <Typography>{citydata.current.condition.text}</Typography>
              </Stack>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent={"space-between"}
              >
                <Typography>Wind Speed</Typography>
                <Typography>{citydata.current.wind_kph} km/h</Typography>
              </Stack>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent={"space-between"}
              >
                <Typography>Humidity</Typography>
                <Typography>{citydata.current.humidity}%</Typography>
              </Stack>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent={"space-between"}
              >
                <Typography>Cloud Coverage </Typography>
                <Typography>{citydata.current.cloud}%</Typography>
              </Stack>
              <Stack
                spacing={{ xs:1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent={"space-between"}
              >
                <Typography>Last Updated </Typography>
                <Typography>{citydata.current.last_updated}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default Application;

