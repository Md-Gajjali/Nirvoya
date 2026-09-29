import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img from "../assets/img.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Pagination } from 'swiper/modules';
import BtnCom from './BtnCom';
import { useSelector } from 'react-redux';

export default function Slider() {

  const { value: product } = useSelector((state) => state.AllProducts)

  const [products , setProducts]= useState("")

  useEffect(() => {
    if (product) {
      setProducts("aise", product)
    }
  }, [product])

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          product?.slice(161, 166).map((item) => {
            return (
              <SwiperSlide key={item.id} className=''>
                <div className='flex items-center justify-end '>
                  
                  <div className='absolute  bottom-[116px] left-[60px]'>
                    <h1 className='w-[445px] font-bold text-[45px] text-primary'>Explore Woman’s Winter Collection</h1>
                    <p className='w-[418px] font-normal text-[20px] mt-[27px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </p>
                    <BtnCom className='mt-[27px]'>SHOP NOW</BtnCom>
                  </div>
                  <div className=' mt-10 '>
                    <img src={item.thumbnail} alt="" srcset="" className='relative w-120! h-120!   object-cover ' />
                  </div>
                </div>
              </SwiperSlide>
            )
          }, [])
        }

      </Swiper>
    </>
  );
}
