import React from 'react'
import Navigation from '../Navigation/Navigation'
import HomeSection from '../HomeSection/HomeSection'
import RightPart from '../RightPart/RightPart'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import TweetDetails from '../TweetDetails/TweetDetails'

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-screen">
      <div className="hidden lg:block lg:col-span-3 overflow-y-auto">
        <div className="sticky top-0">
          <Navigation />
        </div>
      </div>

      <div className="col-span-1 lg:col-span-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/home" element={<HomeSection />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/tweet/:id" element={<TweetDetails />} />
        </Routes>
      </div>

      <div className="hidden lg:block lg:col-span-3 overflow-y-auto">
        <div className="sticky top-0">
          <RightPart />
        </div>
      </div>
    </div>
  )
}

export default Homepage
