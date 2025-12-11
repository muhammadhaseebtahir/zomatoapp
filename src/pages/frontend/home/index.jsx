import { Button } from 'antd'
import React from 'react'
import { useAuthContext } from '../../../context/authContext'

export default function Home() {
  const {handleLogout,user,isAuthenticated} = useAuthContext()
  console.log("User",user)
  console.log("isAuthenticated",isAuthenticated)
  
  return (
    <div>
      <h1>Home page</h1>
      <Button type='primary' onClick={handleLogout} >
        Logout
      </Button>
    </div>
  )
}
