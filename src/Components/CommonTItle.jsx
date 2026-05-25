import React from 'react'

const CommonTItle = ({children ,className}) => {
  return (
      <p className={`font-medium text-[26px] text-black ${className}`} >
        {children}
      </p>
  )
}

export default CommonTItle
