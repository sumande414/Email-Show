import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Email from './pages/Email'
import Order from './pages/Order'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/email' element={<Email/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
    </div>
  )
}

export default App
