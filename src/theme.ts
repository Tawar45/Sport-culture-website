import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F1A501', // Your desired theme color
    },
    secondary: {
      main: '#F1A50161', // Your secondary theme color with opacity
    },
  },
  typography: {
    fontFamily: '"Manrope", sans-serif', // Your desired font family
    // You can also define specific font styles for headings, body text, etc.
    // h1: {
    //   fontFamily: '"Montserrat", sans-serif',
    // },
    // body1: {
    //   fontFamily: '"Manrope", sans-serif',
    // },
  },
  components: {
    MuiButton: {

      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent all buttons from uppercasing
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          // Ensure tabs use the correct font family and other styles
          fontFamily: '"Manrope", sans-serif',
          color: '#4b5563', // Default tab color
          '&.Mui-selected': {
            color: '#F1A501', // Selected tab color matches theme
            fontWeight: 600,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#F1A501', // Indicator color matches theme
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Manrope", sans-serif',
          fontWeight: 600,
          '&.Mui-disabled': {
            color: '#888 !important', // Faded color for disabled label
            opacity: 0.7,
          },
        },
      },
    },
    MuiInputBase: { // Covers text field input and select text
      styleOverrides: {
        root: {
          fontFamily: '"Manrope", sans-serif',
          '&.Mui-disabled': { // Target disabled state on the root of InputBase
            color: '#888 !important', // Faded color for disabled input text/value
            WebkitTextFillColor: '#888 !important', // For Webkit browsers
            opacity: 0.7,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: '"Manrope", sans-serif',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Manrope", sans-serif',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: '"Manrope", sans-serif',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          // This ensures disabled styles apply to the actual text/placeholder for standard variant
          '&.Mui-disabled': {
            color: '#888 !important',
            WebkitTextFillColor: '#888 !important',
            opacity: 0.7,
          },
        },
        underline: {
          '&:before': {
            borderBottom: 'none !important',
          },
          '&:after': {
            borderBottom: 'none !important',
          },
          '&.Mui-disabled:before': { // Hide underline when disabled
            borderBottomStyle: 'none !important',
          },
        },
      },
    },
  },
});

export default theme; 