import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, orange } from '@material-ui/core/colors';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './.Store/rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
  // other store enhancers if any
);

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: deepPurple[900],
      main: deepPurple[700],
      light: deepPurple[400],
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
    },
    common: {
      offWhite: '#fafafa',
    }
  },
});

const  store  =  createStore(rootReducer, enhancer);

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
