import { createTheme } from "@mui/material/styles";

const paletteType = "light";
const theme = createTheme({
  typography: {
    fontFamily: '"roboto", "helvetica", "arial", sans-serif'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: paletteType === "dark" ? "#2b2b2b" : "#eee",
            width: 10,
            height: 10
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: paletteType === "dark" ? "#6b6b6b" : "#939dad",
            minHeight: 24,
            border: `3px solid ${
              paletteType === "dark" ? "#2b2b2b" : "#c9ced6"
            }`
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: paletteType === "dark" ? "#d9d9d9" : "white"
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: paletteType === "dark" ? "#d9d9d9" : "white"
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: paletteType === "dark" ? "#d9d9d9" : "white"
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: paletteType === "dark" ? "#2b2b2b" : "white"
          }
        }
      }
    }
  }
});

export default theme;
