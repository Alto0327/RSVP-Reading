import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RSVP from "./components/Rsvp.jsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />}/>
        <Route path='/App' element={<App/>}/>
        <Route path='/RSVP' element={<RSVP/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
