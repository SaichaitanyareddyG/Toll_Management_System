import React, { Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import {BrowserRouter} from 'react-router-dom';
function App() {

  return (
    <div className='container'>
      <h3>Toll Management Application</h3>
      <hr></hr>
      <BrowserRouter>
    <NavbarComp/>
  </BrowserRouter>
  

    </div>
  )
}

export default App;
