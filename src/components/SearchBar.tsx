import { NearMe } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { item_actions, Weather_info } from "../store";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [shrink, setShrink] = useState(false);

  const text: React.MutableRefObject<HTMLInputElement | null | undefined> =
    useRef();

  const formRef: React.MutableRefObject<HTMLFormElement | undefined> = useRef();

  const tempSearchHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (text.current?.value.length === 0) return;

    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${text.current?.value}&APPID=${process.env.REACT_APP_WEATHER_API}&units=metric`
    );

    if (!response.ok) {
      setError(!response.ok);
      return;
    }

    if (error) setError(false);

    const data = await response.json();

    const weather_info: Weather_info = {
      temp: data.main.temp,
      max_temp: data.main.temp_max,
      min_temp: data.main.temp_min,
      location: data.name,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      icon: data.weather[0].main,
      description: data.weather[0].description,
    };

    dispatch(item_actions.updateTemp(weather_info));

    formRef.current?.reset();
    setShrink(false);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      mt={"1rem"}
      component="form"
      ref={formRef}
    >
      <TextField
        sx={{
          width: { xs: 0.6, md: 0.3 },
          ml: "50px",
        }}
        label="Search"
        inputRef={text}
        InputLabelProps={{ shrink }}
        onFocus={() => setShrink(true)}
        onBlur={() => {
          text.current?.value.length === 0 && setShrink(false);
        }}
        error={error}
        helperText={error && "Please enter a valid location"}
      />
      <IconButton
        type="submit"
        onClick={tempSearchHandler}
        sx={{ width: 50, height: 50, ml: 1 }}
        aria-label="search"
      >
        <NearMe />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
