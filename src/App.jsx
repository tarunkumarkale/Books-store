import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {



  return (
    <>
<Router basename="/Books-store">
  <Routes>
    <Route path="/" element={<h1>home</h1>} />
    <Route path="/Login" element={<h1>Login</h1>} />
  </Routes>
</Router>

  

    </>
  )
}

export default App
