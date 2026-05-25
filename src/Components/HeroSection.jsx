import React from 'react'
import Slider from './Slider'
import sells from "../assets/sells.svg"
import beauty from "../assets/beauty.png"

const HeroSection = () => {


    return (
        <div className='container mt-10'>
            <div className="grid grid-cols-12 gap-6.75 ">
                <div className='col-span-8 bg-[#DFE6F4] rounded-[10px]'>
                    <Slider />
                </div>
                <div className='col-span-4 '>
                    <div className='relative group overflow-hidden flex items-center justify-center '>
                        <img src={sells} alt="" srcset="" />
                        <button type="button" className='absolute -bottom-20 transition-all duration-600 ease-in-out   group-hover:bottom-8  py-4 px-8 font-mons font-semibold bg-white/80 flex items-center justify-center text-primary text-[21px]'>Groceries
                            collection</button>
                    </div>
                    <div className='relative mt-7 group  overflow-hidden flex items-center justify-center '>
                        <img src={beauty} alt="" srcset="" />
                        <button type="button" className='absolute -bottom-20 transition-all duration-600 ease-in-out w-[351px] group-hover:bottom-8  py-4 px-8 font-mons font-semibold bg-white/80 flex items-center justify-center text-primary text-[21px]'>Health & Beauty collection</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
