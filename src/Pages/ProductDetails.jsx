import React, { useEffect, useState,  } from 'react'
import Breadcrumb from '../Components/BreadCrumb'
import b from '../assets/beauty.png'
import { Rate } from 'antd'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios, { Axios } from 'axios'
import ReviewCard from '../Components/ReviewCard'
  import { ToastContainer, toast ,Bounce } from 'react-toastify';

const ProductDetails = () => {

  let { id } = useParams()

  const { value: products } = useSelector(state => state.AllProducts)
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5
  })
  const title = product?.title || 'Product title'
  const thumbnail =product?.thumbnail || 'https://via.placeholder.com/600x600?text=Product'
  const rating = product?.rating || 0
  const reviewCount = product?.reviews?.length || 0
  const price = product?.price || 0
  const discountPercentage = product?.discountPercentage || 0
  const discountedPrice = price - (price * discountPercentage) / 100
  const sku = product?.sku || 'N/A'
  const dis = product?.description
  const minQty = Number(products?.minimumOrderQuantity) || 1
  const [state, setState] = useState(minQty)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState([])
  const [bigImages, setBigImages] = useState(images[0])
  const [zoom ,setZoom] =useState(false)

  console.log(product)

  async function getAllData() {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`)
      setImages(res.data.images || [])
      setProduct(res.data)
      if (res.data.reviews) {
        const formattedReviews = res.data.reviews.map((rev, index) => ({
          ...rev,
          id: rev.id || `rev-${index}-${Date.now()}`
        }))
        setReviews(formattedReviews)
      }
    } catch (error) {
      console.error('Failed to fetch product:', error)
    }
  }

  useEffect(() => {
    if (id) {
      getAllData()
    }
  }, [id])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    const newReview = {
      id: `rev-${Date.now()}`, 
      rating: Number(formData.rating),
      comment: formData.comment,
      reviewerName: formData.name,
      reviewerEmail: formData.email,
      date: new Date().toISOString()
    }

    try {
      await axios.put(`https://dummyjson.com/products/${id}`, {
        reviews: [newReview, ...reviews]
      })

      setReviews(prev => [newReview, ...prev])

      setFormData({
        name: '',
        email: '',
        comment: '',
        rating: 5
      })

      alert('Review submitted successfully!')
    } catch (error) {
      console.error('Failed to submit review:', error)
      setReviews(prev => [newReview, ...prev])
      setFormData({ name: '', email: '', comment: '', rating: 5 })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-amber-400' : 'text-gray-300'}>
        ★
      </span>
    ))
  }

  // if (!product) {
  //   return <div className='p-6 text-center'>Loading product details...</div>
  // }

  




  const handleCounter = e => {
    const text = e.target.innerText
    const maxLimit = Number(product?.minimumOrderQuantity) || 1

    if (text === '-') {
      if (state > 1) {
        setState(state - 1)
      }
    }

    if (text === '+') {
      if (state < maxLimit) {
        setState(state + 1)
      } else {
        
        toast.warn('You cannot order more than' , {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  }

  
    const handleImg = (image) => {
        setBigImages(image)
    }


    

  return (
    <>
      <div className='container'>
        <div className='mt-10'>
          <Breadcrumb />
        </div>
                <ToastContainer />

        <div className='  w-full p-8 rounded-lg   mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            <div className='lg:col-span-7 w-169.5 flex flex-col justify-between'>
              <div className='flex gap-4'>
                <div className='flex-1 bg-gray-100 w-75 h-75 rounded-lg overflow-hidden flex items-center justify-center min-h-[450px]'>
                  <img
                    src={bigImages || thumbnail}
                    alt='Main Product'
                    className='h-full  '
                  />
                </div>

                <div className='flex flex-col items-center justify-between py-2'>
                  <button className='text-gray-500 hover:text-gray-800 p-1 mb-1'>
                    <i className='fa-solid fa-chevron-up' />
                  </button>

                  <div className='flex flex-col gap-3'>
                    {images.map((item, idx) => (
                      <div className='w-16 h-16 rounded-md overflow-hidden border-2 border-sky-500 cursor-pointer'>
                        <img
                          key={item || idx}
                          src={item}
                          alt={`Thumbnail ${idx + 1}`}
                          className='w-full h-full object-cover'
                          onClick={()=>handleImg(item)}
                          onMouseEnter={()=> handleImg(item)}
                          onMouseLeave={()=> setZoom(true)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Share Icons */}
              <div className='flex items-center gap-3 mt-8'>
                <span className='text-gray-600 font-medium text-lg mr-2'>
                  Share
                </span>
                <a
                  href='#'
                  className='w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center hover:opacity-80 transition'
                >
                  <i className='fa-brands fa-linkedin-in' />
                </a>
                <a
                  href='#'
                  className='w-9 h-9 rounded-full bg-sky-100 text-sky-400 flex items-center justify-center hover:opacity-80 transition'
                >
                  <i className='fa-brands fa-twitter' />
                </a>
                <a
                  href='#'
                  className='w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:opacity-80 transition'
                >
                  <i className='fa-brands fa-facebook-f' />
                </a>
                <a
                  href='#'
                  className='w-9 h-9 rounded-full bg-green-100 text-green-500 flex items-center justify-center hover:opacity-80 transition'
                >
                  <i className='fa-brands fa-whatsapp' />
                </a>
                <a
                  href='#'
                  className='w-9 h-9 rounded-full bg-orange-100 text-orange-400 flex items-center justify-center hover:opacity-80 transition'
                >
                  <i className='fa-solid fa-link' />
                </a>
              </div>
            </div>

            {/* RIGHT SECTION: Product Details & Purchase Actions (5 cols) */}
            <div className='lg:col-span-5 flex flex-col justify-between font-sans'>
              <div>
                {/* Title */}
                <h1 className='text-[28px] font-semibold text-[#2D2D2D] leading-[38px] tracking-tight'>
                  {title}
                </h1>

                {/* Rating & Stock Info */}
                <div className='flex items-center gap-4 mt-4 text-sm text-[#555555]'>
                  <div className='flex items-center gap-1.5'>
                    <span className='font-semibold text-gray-800 text-base'>
                      {rating}
                    </span>
                    {/* Antd Rating Component */}
                    <Rate
                      defaultValue={rating}
                      allowHalf
                      className='text-amber-400 text-base'
                    />
                    <span className='text-gray-400 ml-0.5 text-base'>
                      ({reviewCount})
                    </span>
                  </div>

                  <div className='h-4 w-[1px] bg-gray-200' />

                  <button className='flex items-center gap-2 text-gray-400 hover:text-red-500 transition group'>
                    <i className='fa-solid fa-heart text-gray-300 group-hover:text-red-500 text-base' />
                    <span className='text-sm font-medium text-[#0099FF] group-hover:underline'>
                      Add to wishlist
                    </span>
                  </button>
                </div>

                {/* Price & Discount */}
                <div className='flex items-center gap-3 mt-6'>
                  <span className='text-[36px] font-bold text-[#009EFE] leading-none'>
                    ${Math.round(discountedPrice)}
                  </span>
                  <span className='text-gray-400 line-through text-lg font-normal'>
                    ${price}
                  </span>
                  <span className='bg-[#FF9900] text-white text-xs font-bold px-2 py-1 rounded-[3px]'>
                    {discountPercentage}%
                  </span>
                </div>

                {/* SKU & Availability */}
                <div className='flex items-center gap-4 mt-3 text-sm text-gray-500'>
                  <span className='font-bold text-gray-800'>
                    SKU:{' '}
                    <span className='font-normal text-gray-500'>{sku}</span>
                  </span>
                  <span className='flex items-center gap-1.5 text-[#00B57A] font-medium text-xs'>
                    <i className='fa-solid fa-circle-check text-xs' /> In Stock
                  </span>
                </div>

                <div className='border-b border-gray-100 my-5' />

                {/* Short Description */}
                <p className='text-gray-600 text-base leading-[26px]'>{dis}</p>

                {/* Size Selector */}
                <div className='mt-8 flex items-center gap-4'>
                  <span className='text-base text-gray-800 font-medium'>
                    Size
                  </span>
                  <div className='flex items-center gap-2.5'>
                    <button className='w-9 h-9 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 rounded-sm bg-white'>
                      S
                    </button>
                    <button className='w-9 h-9 bg-[#009EFE] text-white text-sm font-medium rounded-sm'>
                      M
                    </button>
                    <button className='w-9 h-9 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 rounded-sm bg-white'>
                      L
                    </button>
                    <button className='w-9 h-9 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 rounded-sm bg-white'>
                      X
                    </button>
                    <button className='w-9 h-9 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 rounded-sm bg-white'>
                      XL
                    </button>
                    <button className='w-9 h-9 border border-gray-200 text-sm text-gray-600 hover:border-gray-400 rounded-sm bg-white'>
                      XXL
                    </button>
                  </div>
                </div>

                {/* Quantity Selector & Action Buttons */}
                <div className='flex items-center gap-4 mt-8'>
                  <span className='text-sm text-gray-600'>Quantity:</span>

                  {/* Quantity Counter */}
                  <div className='flex items-center bg-[#F3F4F6] rounded-sm h-11 px-1'>
                    <button
                      className='text-gray-500 hover:text-black px-3 text-lg'
                      onClick={handleCounter}
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={state}
                      className='w-8 text-center bg-transparent text-base font-medium focus:outline-none'
                      readOnly
                    />
                    <button
                      className='text-gray-500 hover:text-black px-3 text-lg'
                      onClick={handleCounter}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button className='flex-1 bg-[#009EFE] hover:bg-sky-600 text-white font-semibold h-11 px-6 rounded-sm text-base transition'>
                    Add to cart
                  </button>

                  {/* Buy Now Button */}
                  <button className='flex-1 border border-[#009EFE] bg-[#EBF6FF] text-[#009EFE] font-semibold h-11 px-6 rounded-sm text-base hover:bg-sky-100 transition'>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='   mt-20 p-6 font-sans text-gray-700 bg-white'>
            {/* Title */}
            <h1 className='text-2xl md:text-3xl font-medium text-sky-500 pb-4 border-b border-gray-200 mb-6'>
              Producr details of LED Monitor With High Quality In The World
            </h1>

            {/* Specifications Section */}
            <div className='mb-10'>
              <h2 className='text-xl font-bold text-gray-800 mb-4'>
                See the best picture no matter where you sit
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base leading-relaxed'>
                {/* Left Column */}
                <ul className='list-disc list-inside space-y-2'>
                  <li>
                    <span className='font-medium'>Size :</span> M, L, XL
                  </li>
                  <li>
                    <span className='font-medium'>Product Type :</span> Jogger
                  </li>
                  <li>
                    <span className='font-medium'>Main Material :</span> Cotton
                  </li>
                  <li>
                    <span className='font-medium'>Gender :</span> Male
                  </li>
                  <li>
                    <span className='font-medium'>Waist :</span> Mid-rise
                  </li>
                  <li>
                    <span className='font-medium'>Zip :</span> Fly
                  </li>
                </ul>

                {/* Right Column */}
                <ul className='list-disc list-inside space-y-2'>
                  <li>
                    <span className='font-medium'>Zipper :</span> Yes
                  </li>
                  <li>
                    <span className='font-medium'>Pocket :</span> Two front and
                    One Back Pockets.
                  </li>
                  <li>100% Authentic Product</li>
                  <li>
                    Product color may slightly vary due to our photography and
                    Sometimes it’s vary on our devices
                  </li>
                </ul>
              </div>
            </div>

            <hr className='border-gray-200 mb-8' />

            {/* Description Section */}
            <div>
              <h2 className='text-xl font-bold text-gray-800 mb-4'>
                Powerful intelligence for perfection
              </h2>

              <div className='space-y-4 text-sm md:text-base leading-relaxed text-gray-600'>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?
                </p>

                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita
                </p>
              </div>
            </div>
          </div>

          <div className='max-w-[1400px] mx-auto p-6 font-sans text-gray-700 bg-white'>
            {/* 1. Header & Summary Section */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center pb-8 mb-8 border-b border-gray-100 gap-6'>
              <div>
                <h2 className='text-xl font-bold text-gray-800 mb-2'>
                  Customer reviews
                </h2>
                <div className='flex items-center gap-2'>
                  <div className='text-amber-400 text-lg flex'>★★★★★</div>
                  <span className='text-sm font-medium text-gray-600'>
                    4.6 out of 5
                  </span>
                </div>
              </div>

              {/* Dynamic Rating Breakdown Progress Bars */}
              <div className='w-full max-w-xs space-y-1.5'>
                {[5, 4, 3, 2, 1].map(stars => {
                  const count = reviews.filter(
                    r => Math.round(r.rating) === stars
                  ).length
                  const percent = reviews.length
                    ? Math.round((count / reviews.length) * 100)
                    : 0
                  return (
                    <div
                      key={stars}
                      className='flex items-center text-xs text-gray-600 gap-2'
                    >
                      <span className='w-12 text-right'>{stars} Stars</span>
                      <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-amber-400 rounded-full transition-all duration-300'
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className='w-8'>{percent}%</span>
                    </div>
                  )
                })}
              </div>

              <div>
                <a
                  href='#review-form'
                  className='inline-block bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm px-6 py-2.5 rounded shadow-sm transition-colors'
                >
                  Write a Review
                </a>
              </div>
            </div>

            {/* 2. Reviews List Section (Fetched from API) */}
            <div className='mb-12'>
              <h3 className='text-xl font-bold text-gray-800 mb-6'>
                Reviews ({reviews.length})
              </h3>

              {reviews.length === 0 ? (
                <p className='text-gray-500 text-sm'>
                  No reviews yet. Be the first to write one!
                </p>
              ) : (
                <div className='space-y-6'>
                  {/* {reviews.map((review) => (
              <div key={review.id || review._id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar || 'https://via.placeholder.com/40'}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{review.name}</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-gray-700">{review.rating}.0</span>
                      <div className="text-amber-400 flex">{renderStars(review.rating)}</div>
                      <span className="text-gray-400">{review.createdAt || review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed pl-13">
                  {review.comment}
                </p>
              </div>
            ))} */}
                  {reviews.map((item, index) => (
                    <ReviewCard
                      key={item.id || item._id || index}
                      comment={item.comment}
                      name={item.reviewerName || item.name || 'Anonymous'}
                      rating={item.rating || 0}
                      date={item.date || item.createdAt || ''}
                      avatar={item.avatar || 'https://via.placeholder.com/40'}
                      alt={item.reviewerName || item.name || 'Reviewer avatar'}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 3. Add Your Review Form */}
            <div id='review-form' className='pt-6 border-t border-gray-100'>
              <h3 className='text-xl font-bold text-gray-800 mb-1'>
                Add Your Review
              </h3>
              <p className='text-sm text-gray-400 mb-6'>
                Share your experience with this product.
              </p>

              <form onSubmit={handleSubmit} className='max-w-2xl space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Name *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-200 rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email *
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-200 rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Review *
                  </label>
                  <textarea
                    rows='4'
                    name='comment'
                    value={formData.comment}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-200 rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500'
                  ></textarea>
                </div>

                {/* Dynamic Rating Selection */}
                <div className='flex items-center gap-3 py-2'>
                  <span className='text-sm font-medium text-gray-700'>
                    Rating
                  </span>
                  <div className='flex text-amber-400 text-lg cursor-pointer'>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        onClick={() =>
                          setFormData(prev => ({ ...prev, rating: star }))
                        }
                        className={
                          star <= formData.rating
                            ? 'text-amber-400'
                            : 'text-gray-300'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type='submit'
                  className='bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm px-8 py-2.5 rounded transition-colors'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
