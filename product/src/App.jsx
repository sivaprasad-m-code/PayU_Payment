import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './product'


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route path='/' element={<Products/>}/>
        
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App