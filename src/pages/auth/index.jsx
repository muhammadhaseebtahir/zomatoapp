import React from 'react'
import {Routes,Route} from "react-router-dom"
import UserRegister from './userRegister'
import UserLogin from './userLogin'
import FoodpartnerRegister from './foodpartnerRegister'

import Verify_otp from './verify_otp'
import Forgot_password from './forgot_password'
export default function AuthIndex() {
  return (
    <Routes>
      <Route path='/user-register'  element={<UserRegister/>} />
    <Route path='/login' element={<UserLogin/>} />
    <Route path='/verify-otp' element={<Verify_otp/>} />
    <Route path='/foodpartner-register' element={<FoodpartnerRegister/>} />
    <Route path='/forgot-password' element={<Forgot_password/>}  />
    </Routes>
  )
}
