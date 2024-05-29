import React from 'react'

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#19201D] bg-opacity-100 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
    </div>
  )
}

export default PageLoader