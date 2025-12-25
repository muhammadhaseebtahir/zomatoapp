import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InstagrameHome from './home'
// import Blog from './blog'
// import Header from '../../component/header'
import PostCreated from './postCreated'


export default function Index() {
  return (
    <>
{/* <Header/> */}
    <main>

    <Routes>
      <Route index   element={<InstagrameHome/>} />
      {/* <Route path="/blog" element={<Blog/>} /> */}
      <Route  path='/postCreate' element={<PostCreated/>}  />
    </Routes>
    </main>
    </>
  )
}
