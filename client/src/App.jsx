import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home'
import Blog from './pages/Blog/Blog'
import Dashboarde from './pages/Dashboard/Dashboarde'
import RemoveBackground from './pages/RemoveBackground/RemoveBackground'
import RemoveObject from './pages/RemoveObject/RemoveObject'
import ReviewResume from './pages/ReviewResume/ReviewResume'
import WriteArtical from './pages/WriteArtical/WriteArtical'
import Community from './pages/Community/Community'
import GenerateImage from './pages/GenerateImages/GenerateImage'
import Layout from './pages/Layout/Layout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path="/ai" element={<Layout />}>
        <Route index element={<Dashboarde />} />
        <Route path='blog-titles' element={<Blog />} />
        <Route path='community' element={<Community />} />
        <Route path='generate-images' element={<GenerateImage />} />
        <Route path='remove-background' element={<RemoveBackground />} />
        <Route path='remove-object' element={<RemoveObject />} />
        <Route path='review-resume' element={<ReviewResume />} />
        <Route path='write-article' element={<WriteArtical />} />
      </Route>
    </Routes>
  )
}

export default App
