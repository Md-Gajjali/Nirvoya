import React from 'react'
import CommonTItle from './CommonTItle'
import RightArrow from '../icons/RightArrow'
import Card from './Card'
import { useSelector } from 'react-redux'

const FleshDeal = () => {
  const { value: product } = useSelector((state) => state.AllProducts)

  return (
    <div className='container mt-[45px] '>
      <CommonTItle className="flex justify-between items-center">
        <span className='font-medium text-[26px] font-pop '>Flesh Deals</span>
        <span className='font-medium text-[16px] font-pop flex justify-between items-center gap-[18px] '>View more <RightArrow /> </span>
      </CommonTItle>
      <div className='grid  lg:grid-cols-12 gap-6 mt-[20px]'>
        {
          product?.slice(161, 165).map((item, id) => {
            return (
              // Protita Card wrapper-e col-span dite hobe
              <div key={item.id} className='col-span-3'>
                <Card
                  img={item.thumbnail}
                  disPar={item.discountPercentage}
                  price={Math.round(item.price - (item.price * item.discountPercentage) / 100)}
                  disPrice={item.price}
                  rating={item.rating}
                  rate={item.rating}
                  p={item.title}
                  id={item.id}
                  productDetails={item}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FleshDeal
