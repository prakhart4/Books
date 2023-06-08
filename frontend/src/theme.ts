import { createTheme } from "@mui/material/styles";
// import { PaletteMode } from "@mui/material";

// Create a theme instance.
const themeCreator = () =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          autoComplete: "none",
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
            },
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 0,
            //   backgroundColor:'#fff'
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            overflow: "overlay",
            scrollbarColor: "#6b6b6b transparent",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "transparent",
              width: 8,
              height: 4,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 25,
              backgroundColor: "#6b6b6b20",
              minHeight: 24,
              // border: "3px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
    },
    palette: {
      background: {
        default: "#fff", //darkmode
        paper: "#f6f6f7", //'#ECF4FC'//'#035'
      },
      primary: {
        main: "#131921",
      },
      secondary: {
        main: "#FFD712",
      },
      // neutral: {
      //   main:'#fff8',
      //   contrastText: '#000',
      // },
    },
    shape: {
      borderRadius: 3,
    },
  });

export default themeCreator;
