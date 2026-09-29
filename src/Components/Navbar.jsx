import React, { useState, useEffect, useRef } from 'react'
import { Nirvoya, Login, Heart, Cart } from '../icons/Icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { CartReducer, RemoveReducer, SubTotalReducer, wishListReducer, WishListRemoveReducer } from '../SliceReducer'
// import { addToCart } from '../redux/slices/cartSlice'
// import { removeFromWishlist } from '../redux/slices/wishlistSlice'

const Navbar = () => {
  const { cart: product = [] } = useSelector((state) => state.AllProducts)
  const { wishList: wishProduct = [] } = useSelector((state) => state.AllProducts)

  const [searchTerm, setSearchTerm] = useState('')
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const wishlistRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const sanitizeInput = (value) => {
    return value.replace(/['"`;\\=<>/*-]/g, '')
  }

  const handleSearchChange = (e) => {
    const cleanValue = sanitizeInput(e.target.value)
    setSearchTerm(cleanValue)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const cleanQuery = searchTerm.trim()
    if (cleanQuery) {
      navigate(`/search?q=${encodeURIComponent(cleanQuery)}`)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setIsWishlistOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCart = () => {
    navigate('/Cartitem')
  }

  const handleAddToCartFromWishlist = (e, item) => {
    e.stopPropagation()
   const matchItem = product.find((cartItem)=> cartItem.id === item.id)
   if (!matchItem) {
    dispatch(CartReducer({ ...item , quan : 1 }))
    dispatch(SubTotalReducer())
   }
  }

  const handleRemoveFromWishlist = (e, id) => {
    e.stopPropagation()
    // dispatch(RemoveReducer(id))
    dispatch(WishListRemoveReducer(id))
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur shadow-[0_2px_15px_rgba(0,0,0,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Container */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 py-3.5 md:py-4">
          
          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className="cursor-pointer transition-transform duration-200 hover:opacity-90 active:scale-95"
          >
            <Nirvoya />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg lg:max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                maxLength={60}
                placeholder="I'm looking for..."
                className="w-full bg-[#F6F6F6] text-gray-800 text-sm rounded-lg pl-4 pr-12 py-2.5 outline-none border border-transparent focus:border-[#0198E9] focus:bg-white transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center w-11 bg-[#0198E9] hover:bg-[#0180C4] text-white rounded-r-lg transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-3.5 sm:gap-6 lg:gap-8">
            
            {/* Login */}
            <div 
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-[#0198E9] transition-colors group"
            >
              <div className="transition-transform group-hover:scale-110">
                <Login />
              </div>
              <span className="hidden sm:inline-block text-sm lg:text-[15px] font-medium select-none">
                Login
              </span>
            </div>

            {/* Wishlist Dropdown Root */}
            <div className="relative" ref={wishlistRef}>
              <button
                onClick={() => setIsWishlistOpen((prev) => !prev)}
                className="flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-[#0198E9] transition-colors group p-1"
              >
                <div className="relative transition-transform group-hover:scale-110">
                  <Heart />
                  {wishProduct.length > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#0198E9] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                      {wishProduct.length > 99 ? '99+' : wishProduct.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block text-sm lg:text-[15px] font-medium select-none">
                  Wishlist
                </span>
              </button>

              {/* Wishlist Dropdown Panel */}
              {isWishlistOpen && (
                <div className="fixed inset-x-3 top-20 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 w-auto sm:w-96 bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] border border-gray-100 p-4 z-50 transform origin-top-right transition-all">
                  
                  {/* Dropdown Header */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800 text-sm">My Wishlist</h4>
                      <span className="text-[11px] font-semibold text-[#0198E9] bg-sky-50 px-2 py-0.5 rounded-full">
                        {wishProduct.length} {wishProduct.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    {/* {wishProduct.length > 0 && (
                      <button
                        onClick={() => {
                          navigate('/wishlist')
                          setIsWishlistOpen(false)
                        }}
                        className="text-xs font-medium text-gray-400 hover:text-[#0198E9] flex items-center gap-1 transition-colors"
                      >
                        View All
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )} */}
                  </div>

                  {/* Dropdown Scrollable List */}
                  <div className="divide-y divide-gray-50 max-h-64 sm:max-h-72 overflow-y-auto my-1 pr-1">
                    {wishProduct.length > 0 ? (
                      wishProduct.map((item, index) => (
                        <div
                          key={item.id || index}
                          className="py-2.5 flex items-center gap-3 hover:bg-gray-50/80 px-2 rounded-xl transition-colors"
                        >
                          <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                            <img
                              src={item.image || item.thumbnail || "https://via.placeholder.com/60"}
                              alt={item.title || item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-[13px] font-medium text-gray-800 truncate leading-snug">
                              {item.title || item.name}
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-[#0198E9] mt-0.5">
                              ${item.price}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={(e) => handleAddToCartFromWishlist(e, item)}
                              className="bg-[#0198E9] hover:bg-[#0180C4] active:scale-95 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition shadow-sm"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                              className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-7 flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-2 text-gray-300">
                          <Heart />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Your wishlist is empty</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Explore and save items you like!</p>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Footer Action */}
                  {wishProduct.length > 0 && (
                    <div className="pt-2.5 border-t border-gray-100">
                      <button
                        onClick={() => {}}
                        className="w-full bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Move All to Cart
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Trigger */}
            <div
              onClick={handleCart}
              className="flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-[#0198E9] transition-colors group p-1"
            >
              <div className="relative transition-transform group-hover:scale-110">
                <Cart />
                {product.length > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#0198E9] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                    {product.length > 99 ? '99+' : product.length}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-sm lg:text-[15px] font-medium select-none">
                My cart
              </span>
            </div>

          </div>
        </div>

        {/* Mobile Search Bar (Stacked row below logo) */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              maxLength={60}
              placeholder="I'm looking for..."
              className="w-full bg-[#F6F6F6] text-gray-800 text-xs rounded-lg pl-3.5 pr-11 py-2.5 outline-none border border-transparent focus:border-[#0198E9] focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 bg-[#0198E9] text-white rounded-r-lg"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </header>
  )
}

export default Navbar