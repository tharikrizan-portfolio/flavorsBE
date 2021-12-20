import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1E94A5',
    },
    secondary: {
      main: '#6E80AE',
    },
    error: {
      main: '#FF7070',
    },
    warning: {
      main: '#FCA311',
    },
    success: {
      main: '#44D07C',
    },
    info: {
      main: '#1D3557',
    },
    text: {
      primary: '#626161',
      secondary: '#454545',
    },
    hoverColor: '#F7F8FC',
    darkHeader: '#1D3557',
  },
  typography: {
    useNextVariants: true,
    h6: {
      color: '#454545',
    },
    subtitle2: {
      color: '#454545',
    },
  },
});

export default theme;
