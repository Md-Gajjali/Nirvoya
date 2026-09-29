import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import MegaMenu from './Components/MegaMenu'
import axios, { all, Axios } from 'axios'
import { useDispatch } from 'react-redux'
import { AllProductReducer } from './SliceReducer'

const RoutLayout = () => {
  const dispatch = useDispatch()

  const [allProduct, setAllProduct] = useState([])

  // useEffect(() => {
  //     const res = axios.get("https://dummyjson.com/products?limit=0")
  //         .then((res) => {
  //             setAllProduct(res.data.products)
  //         })

  //     return

  // }, [])

  useEffect(() => {
    try {
      const res = axios
        .get(`https://dummyjson.com/products?limit=0`)
        .then(res => {
          setAllProduct(res.data.products)
          dispatch(AllProductReducer(res.data.products))
        })
    } catch (error) {
      console.log('api fetch hosse nah', error)
    }
  }, [])

  return (
    <>
      <Navbar />
      <MegaMenu />
      <Outlet />
    </>
  )
}

export default RoutLayout
