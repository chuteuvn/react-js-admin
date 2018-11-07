import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import routes from './routes';
import store from './redux';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<BrowserRouter>
						{renderRoutes(routes)}
					</BrowserRouter>
				</MuiThemeProvider>
			</Provider>
		)
	}
}

render(<App />, document.querySelector('#root'));