import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';

const App = () => {
  return (
    <>
      <Router basename="/Books-store">
        <Routes>
          <Route path="/" element={<h1 className='font-bold text-red-800'>home</h1>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App