import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Navbar from './Componenets/Navbar'
import List from './Pages/List';

const App = () => {
  return (
    <>
      <Router basename="/Books-store">
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<h1 className='font-bold text-red-800'>home</h1>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/List" element={<List/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App