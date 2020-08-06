import React , { Fragment } from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import './assets/styles/global.css';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Routes />
    </Fragment>
  );
}

export default App;
