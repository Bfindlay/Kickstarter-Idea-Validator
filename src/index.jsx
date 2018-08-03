import React from 'react';
import { render } from 'react-dom';
import { Router,IndexRoute, Route, hashHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
require("babel-polyfill");
import { Provider } from 'react-redux'
import {compose, createStore, applyMiddleware } from 'redux'
import { Root, App  } from './Components';
const container = document.getElementById('app');
import {MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#FFF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will us the default color
  },
});



const store = createStore(reducers, {} , compose(applyMiddleware(ReduxThunk)));


render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
          <Router history={hashHistory}>
              <Route path ='/' component={Root}>
                <IndexRoute component={App} />
              </Route>
          </Router> 
      </Provider>
    </MuiThemeProvider>,
container);