import React from 'react'
import {Routes,Route} from "react-router-dom"
import UserRegister from './userRegister'
import UserLogin from './userLogin'
import FoodpartnerRegister from './foodpartnerRegister'
import FoodpartnerLogin from './foodpartnerLogin'
import Verify_otp from './verify_otp'
export default function AuthIndex() {
  return (
    <Routes>
      <Route path='/user-register'  element={<UserRegister/>} />
    <Route path='/user-login' element={<UserLogin/>} />
    <Route path='/verify-otp' element={<Verify_otp/>} />
    <Route path='/foodpartner-register' element={<FoodpartnerRegister/>} />
    <Route path='/foodpartner-login' element={<FoodpartnerLogin/>}  />
    </Routes>
  )
}
