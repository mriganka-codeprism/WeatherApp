import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Reduxstate } from "../store";

enum weather_icons {
  cloudy = "cloudy.png",
  clear = "sun.png",
  rain = "heavy-rain.png",
  mist = "Mist.png",
  thunderstorm = 'storm.png'
}

const Temp = () => {
  const weather_info = useSelector((state: Reduxstate) => state.items.data);

  return (
    <>
      <Typography
        sx={{ fontFamily: "Rubik", textAlign: "center", mt: "5rem" }}
        variant="h4"
      >
        {weather_info.location}
      </Typography>
      <Typography
        fontFamily={"Rubik"}
        textAlign={"center"}
        mt={"2rem"}
        variant={"h6"}
        fontStyle={"italic"}
      >
        {weather_info.description}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"2rem"}
      >
        {weather_info.icon && (
          <img
            alt={`${weather_info.icon}`}
            src={
              process.env.PUBLIC_URL +
              `${
                weather_info.icon === "Rain"
                  ? weather_icons.rain
                  : weather_info.icon === "Clear"
                  ? weather_icons.clear
                  : weather_info.icon === "Clouds"
                  ? weather_icons.cloudy
                  : weather_info.icon === "Haze"
                  ? weather_icons.mist
                  : weather_info.icon === "Mist"
                  ? weather_icons.mist
                  : weather_info.icon === "Thunderstorm"
                  ? weather_icons.thunderstorm
                  : undefined
              }`
            }
            width={80}
            height={80}
          />
        )}
        <Typography sx={{ fontFamily: "Rubik", ml: 2 }} variant="h2">
          {weather_info.temp} &deg;C
        </Typography>
      </Box>

      <Box mt={10} width={{ xs: 1, sm: 0.6 }} mx={"auto"}>
        <Grid container rowSpacing={5} textAlign={"center"}>
          <Grid item fontFamily={"Rubik"} xs={6}>
            Min Temp: {weather_info.min_temp} &deg;C
          </Grid>
          <Grid item fontFamily={"Rubik"} xs={6}>
            Max Temp: {weather_info.max_temp} &deg;C
          </Grid>
          <Grid item fontFamily={"Rubik"} xs={6}>
            Feels Like: {weather_info.feels_like} &deg;C
          </Grid>
          <Grid item fontFamily={"Rubik"} xs={6}>
            Humidity: {weather_info.humidity}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Temp;
