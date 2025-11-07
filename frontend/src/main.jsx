import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <App />
      <Toaster position='top-right' toastOptions={{
        error:{
          style:{
            backgroundColor:'#fdc8c8'
          }
        },
        success:{
          style:{
            backgroundColor:'#c9ffb9ff'
          }
        }
      }}/>
    </BrowserRouter>
  
)
