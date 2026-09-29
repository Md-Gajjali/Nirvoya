import React from 'react'

const Container = ({children, className=""}) => {
  return (
    <>
      <div className={`${className} max-w-350  m-auto `}>
        {children}
      </div>
    </>
  )
}

export default Container
