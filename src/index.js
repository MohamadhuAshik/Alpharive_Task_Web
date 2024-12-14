import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { DataProvider } from './context/DataContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <DataProvider>

        <App />
      </DataProvider>

    </BrowserRouter>
  </React.StrictMode>
);

