import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ModalProvider } from './context/modalContext';
import { store } from "./app/store"
import 'react-toastify/dist/ReactToastify.css'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
        <ModalProvider>
          <ToastContainer />
          <App />
        </ModalProvider>
    </Provider>
  </BrowserRouter>
);
