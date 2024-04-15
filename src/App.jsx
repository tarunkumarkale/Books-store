import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Navbar from './Componenets/Navbar'
import List from './Pages/List';
import Home from './Pages/Home';
import Detail from './Pages/Detail';

const App = () => {
  return (
    <>
    {/* in case of firebase firestore  when we need data like name,id,etc like  means fetch  always use .data() */}
      <Router basename="/Books-store">
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/List" element={<List/>} />
          <Route path="/view/:bookId" element={<Detail/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App