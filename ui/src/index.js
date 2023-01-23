import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from './components/Routes/AuthRoute';
import IndexRoute from './components/Routes/IndexRoute';
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

function App(){

  return(
    <BrowserRouter>
      <AuthRoute/>
      <IndexRoute/>
    </BrowserRouter>
  )
}



root.render(
    
       <App /> 
    
)

