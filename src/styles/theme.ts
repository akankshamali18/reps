import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#10a37f', 
    },
    secondary: {
      main: '#444654', 
    },
    background: {
      default: '#343541', 
      paper: '#444654', 
    },
    text: {
      primary: '#ffffff', 
      secondary: '#d1d5db', 
    },
  },
});

export default theme;
