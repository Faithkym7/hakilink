import { createTheme } from '@mui/material/styles';

// Color tokens according to company palette
export const shades = {
  black: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000"
  },
  white: {
    100: "#ffffff",
    200: "#ffffff",
    300: "#ffffff",
    400: "#ffffff",
    500: "#ffffff",
    600: "#F5F5F5",
    700: "#999999",
    800: "#666666",
    900: "#333333"
  },
  indigo: {
    100: "#d8e3dc",
    200: "#b1c7ba",
    300: "#8baa97",
    400: "#648e75",
    500: "#3d7252",
    600: "#315b42",
    700: "#254431",
    800: "#182e21",
    900: "#0c1710"
  },
  lighgreen: '#96b23d',
  darkgreen: '#013A17',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.black[500],
      light: shades.black[100],
    },
    secondary: {
      main: shades.white[100],
      second: shades.lighgreen,
      third: shades.darkgreen,
    },
  },
 
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: "1.125rem",  // 18px
    fontWeight: 400,

    h1: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: "3rem",  // 48px
      fontWeight: 400,
      [`@media (min-width: 576px)`]: {
        fontSize: "3.5rem",  // 56px
      },
      [`@media (min-width: 768px)`]: {
        fontSize: "4rem",  // 64px
      },
      [`@media (min-width: 992px)`]: {
        fontSize: "4.5rem",  // 72px
      },
      [`@media (min-width: 1200px)`]: {
        fontSize: "5rem",  // 80px
      },
    },
    h2: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: "2.5rem",  // 40px
      fontWeight: 400,
      [`@media (min-width: 576px)`]: {
        fontSize: "2.75rem",  // 44px
      },
      [`@media (min-width: 768px)`]: {
        fontSize: "3rem",  // 48px
      },
      [`@media (min-width: 992px)`]: {
        fontSize: "3.25rem",  // 52px
      },
      [`@media (min-width: 1200px)`]: {
        fontSize: "3.5rem",  // 56px
      },
    },
    h3: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: "2rem",  // 32px
      fontWeight: 400,
      [`@media (min-width: 576px)`]: {
        fontSize: "2.25rem",  // 36px
      },
      [`@media (min-width: 768px)`]: {
        fontSize: "2.5rem",  // 40px
      },
      [`@media (min-width: 992px)`]: {
        fontSize: "2.75rem",  // 44px
      },
      [`@media (min-width: 1200px)`]: {
        fontSize: "3rem",  // 48px
      },
    },
    h4: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: "1.75rem",  // 28px
      fontWeight: 400,
      [`@media (min-width: 576px)`]: {
        fontSize: "2rem",  // 32px
      },
      [`@media (min-width: 768px)`]: {
        fontSize: "2.25rem",  // 36px
      },
      [`@media (min-width: 992px)`]: {
        fontSize: "2.5rem",  // 40px
      },
      [`@media (min-width: 1200px)`]: {
        fontSize: "2.75rem",  // 44px
      },
    },
    h5: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: "1.5rem",  // 24px
      fontWeight: 400,
      [`@media (min-width: 576px)`]: {
        fontSize: "1.75rem",  // 28px
      },
      [`@media (min-width: 768px)`]: {
        fontSize: "2rem",  // 32px
      },
      [`@media (min-width: 992px)`]: {
        fontSize: "2.25rem",  // 36px
      },
      [`@media (min-width: 1200px)`]: {
        fontSize: "2.5rem",  // 40px
      },
    },
    h6: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: "1.25rem",  // 20px
      fontWeight: 400,
      [`@media (min-width: 576px)`]: {
        fontSize: "1.5rem",  // 24px
      },
      [`@media (min-width: 768px)`]: {
        fontSize: "1.75rem",  // 28px
      },
      [`@media (min-width: 992px)`]: {
        fontSize: "2rem",  // 32px
      },
      [`@media (min-width: 1200px)`]: {
        fontSize: "2rem",  // 36px
      },
    },
  },

  body: {
    backgroundColor: shades.white[100],
    color: shades.black[900],
    padding: '16px',
    marginLeft: '3rem',
    marginRight: '3rem',

    // Responsive margins
    '@media (min-width: 576px)': {
      marginLeft: '2rem',
      marginRight: '2rem',
    },
    '@media (min-width: 768px)': {
      marginLeft: '5rem',
      marginRight: '5rem',
    },
    '@media (min-width: 992px)': {
      marginLeft: '8rem',
      marginRight: '8rem',
    },
    '@media (min-width: 1200px)': {
      marginLeft: '15rem',
      marginRight: '15rem',
    },
  },
});
