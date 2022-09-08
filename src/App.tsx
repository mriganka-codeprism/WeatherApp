import { Brightness4, Brightness7 } from "@mui/icons-material";
import {
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Temp from "./components/Temp";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const handleTheme = () => {
    if (theme === lightTheme) return setTheme(darkTheme);

    setTheme(lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={'flex'} alignItems={'center'}>
        <IconButton sx={{ ml: 1 }} onClick={handleTheme} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <SearchBar/>
      <Temp/>
    </ThemeProvider>
  );
}

export default App;
