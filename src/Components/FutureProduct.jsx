import React, { useState } from 'react'
import Container from './Container'
import CommonTItle from './CommonTItle'
import RightArrow from '../icons/RightArrow'
import { useSelector } from 'react-redux'
import Card from './Card'
import BtnCom from './BtnCom'

const FutureProduct = () => {
    const { value: product } = useSelector(state => state.AllProducts)

    const INITIAL_LIMIT = 16
    const [next, setNext] = useState(INITIAL_LIMIT)

    const handleProductList = () => {
        setNext(prev => (prev === INITIAL_LIMIT ? prev + 16 : INITIAL_LIMIT))
    }

    return (
        <>
            <Container className='mt-12.5'>
                <CommonTItle className='flex justify-between items-center'>
                    <span className='font-medium text-[26px] font-pop '>
                        Featured Product
                    </span>
                    <span className='font-medium text-[16px] font-pop flex justify-between items-center gap-[18px] '>
                        View more <RightArrow />{' '}
                    </span>
                </CommonTItle>

                <div className='grid grid-cols-12 gap-6 mt-[20px]'>
                    {product?.slice(0, next).map(item => {
                        return (
                            <div key={item.id} className='col-span-3'>
                                <Card
                                    img={item.thumbnail}
                                    disPar={item.discountPercentage}
                                    price={Math.round(
                                        item.price - (item.price * item.discountPercentage) / 100
                                    )}
                                    disPrice={item.price}
                                    rating={item.rating}
                                    rate={item.rating}
                                    p={item.title}
                                    id={item.id}
                                    productDetails={item}
                                />
                            </div>
                        )
                    })}
                    <div className='col-span-12 flex w-full items-center justify-center'>
                        <BtnCom onClick={handleProductList}>
                            {next === INITIAL_LIMIT ? 'See More' : 'See Less'} {' '}
                        </BtnCom>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default FutureProduct
