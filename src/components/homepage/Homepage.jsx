
// import React from 'react'
// import Navigation from '../Navigation/Navigation'
// import HomeSection from '../HomeSection/HomeSection'
// import RightPart from '../RightPart/RightPart'

// const Homepage = () => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 px-5 lg:px-36 gap-4">
//   <div className="hidden lg:block lg:col-span-3 sticky  top-0 h-screen">
//     <Navigation></Navigation>
//   </div>

//   <div className="col-span-1 lg:col-span-6">
//    <HomeSection/>
//   </div>

//   <div className="hidden lg:block lg:col-span-3 sticky  top-0 h-screen">
//     <RightPart/>x
//   </div>
// </div>

//   )
// }

// export default Homepage



import React from 'react'
import Navigation from '../Navigation/Navigation'
import HomeSection from '../HomeSection/HomeSection'
import RightPart from '../RightPart/RightPart'

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-screen">
      <div className="hidden lg:block lg:col-span-3 overflow-y-auto">
        <div className="sticky top-0">
          <Navigation />
        </div>
      </div>

      <div className="col-span-1 lg:col-span-6 overflow-y-auto">
        <HomeSection />
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
