import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home' 
import MiningPage from '../pages/MiningPage' 

const Approutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/minings' element={<MiningPage />} /> 
            </Routes>
        </>
    )
}

export default Approutes
