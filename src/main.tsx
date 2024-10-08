import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import './main.css';
import { Box } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Box mt={3} p={0} pb={12} mx="auto" width="90%" maxWidth={1100}>
      <App />
    </Box>
    </BrowserRouter>
  </React.StrictMode>,
)
