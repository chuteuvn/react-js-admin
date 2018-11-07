import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
const theme = createMuiTheme({
    palette: {
        primary: indigo,
    },
    spacing: {
        unit:4
    },
    mixins: {
        toolbar: {
            '@media (min-width:0px) and (orientation: landscape)': {
                minHeight: 40
            },
            '@media (min-width:600px)': {
                minHeight: 40
            }
        }
    }
});

export default theme;