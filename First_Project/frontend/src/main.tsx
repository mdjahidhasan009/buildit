import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toaster} from "react-hot-toast";
import App from './App.tsx'
import './index.css'
import {DesignProvider} from "./context/DesignProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <DesignProvider>
        <App />
        <Toaster />
      </DesignProvider>
    </>
  </React.StrictMode>,
)
