import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Main from './Main.jsx'
import { Home, SignUp, TestCard, Login, MakeSet, CardSet } from './components/export.js'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const isLoggedIn = localStorage.getItem('loggedUser') != null
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />}/>       

        {
          isLoggedIn ? (
            <>
            <Route path="/signup" element={<Navigate to="/home" replace />}/>
            <Route path="/login" element={<Navigate to="/home" replace />}/>

            <Route path="/home"  element={<Home/>}/>
            <Route path="/makeset" element={<MakeSet/>}/>
            <Route path="/cardset/:setId" element={<CardSet/>}/>
            </>
          )
          : (
            <>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*"  element={<Navigate to="/login" replace />}/>
            </>

          )
        }
        
        
      </Routes>
    </BrowserRouter>
    
  )
}

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  )
  
}
renderApp()
export default renderApp

