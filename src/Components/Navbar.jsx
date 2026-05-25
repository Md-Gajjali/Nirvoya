import React from 'react'
import { Nirvoya, Login, Heart, Cart } from '../icons/Icons'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className='container mt-7.75  '>
      <div className='flex  justify-between items-center'>
        <div>
          <Nirvoya />
        </div>
        <div className=' relative flex bg-[]'>
          <input type="search" name="search" placeholder={`I'm looking for...`} className=' border-none outline-none  w-194.5 bg-[#F6F6F6] py-[13px] px-5 rounded-[6px]' />
          <div className=' absolute top-0 right-0 py-[17px] px-4.25 flex justify-center items-center bg-[#0198E9] rounded-r-[6px]'>
            <FaMagnifyingGlass className='text-white ' />
          </div>
        </div>
        <div className='flex justify-between items-center gap-10'>
          <div className='flex gap-1.5'>
            <Login />
            <p className='text-[16px]'>Login</p>
          </div>
          <div className='flex gap-1.5'>
            <Heart />
            <p className='text-[16px]'>Wishlist</p>
          </div>
          <div className='flex gap-1.5'>
            <Cart />
            <p className='text-[16px]'>My cart</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
