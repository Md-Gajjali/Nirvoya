import React, { useState } from 'react'
import CommonTItle from './CommonTItle'
import { useSelector, useDispatch } from 'react-redux'
import Card from './Card'


const Category = () => {
  const { value: category } = useSelector(state => state.AllProducts)

  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategory = (cat) => {
    setSelectedCategory(cat)
  }

  const filteredProducts = selectedCategory
    ? category.filter((item) => item.category === selectedCategory)
    : []

  return (
    <div className='container'>
      <CommonTItle className='mt-10'>Category</CommonTItle>
      <div className='mt-5'>
        <ul className='flex flex-wrap gap-6'>
          {[...new Set(category.map(item => item.category))].map(
            (uniqueCategory, index) => {
              return (
                <li
                  key={index}
                  className='py-4 px-4 bg-[#FFFFFF] shadow cursor-pointer hover:bg-gray-100 transition-all'
                  // Arrow function use kore uniqueCategory pass kora hoyeche
                  onClick={() => handleCategory(uniqueCategory)}
                >
                  <span>{uniqueCategory}</span>
                </li>
              )
            }
          )}
        </ul>

        {/* Select kora category-r product-guli ekhane niche show korbe */}
        <div className="mt-10">
          {selectedCategory && (
            <h3 className="text-xl font-bold mb-4">
              Selected Category: <span className="text-blue-600">{selectedCategory}</span>
            </h3>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, index) => (
              <Card
                img={item.thumbnail}
                disPar={item.discountPercentage}
                price={Math.round(item.price - (item.price * item.discountPercentage) / 100)}
                disPrice={item.price || 0}
                rating={item.rating}
                rate={item.rating}
                p={item.title}
                id={item.id}
                productDetails={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
