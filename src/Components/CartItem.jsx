import { toast, Bounce } from 'react-toastify'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { DecrementReducer, IncrementReducer, RemoveReducer, SubTotalReducer } from '../SliceReducer';

export const CartItems = ({
  id,
  price,
  image,
  alt,
  quantity,
  title
}) => {
  const dispatch = useDispatch()

  const notify = () =>
    toast.error('Removed from cart', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    })

  const handleIncrease = () => {
    dispatch(IncrementReducer(id))
    dispatch(SubTotalReducer())
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(DecrementReducer(id))
      dispatch(SubTotalReducer())
    }
  }

  const handleDelete = () => {
    dispatch(RemoveReducer(id))
    dispatch(SubTotalReducer())
    notify()
  }

  return (
    <div className='grid grid-cols-4 items-center py-4 px-4 sm:px-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-4 gap-2 sm:gap-4'>
      
      {/* 1. Product Image & Name */}
      <div className='flex items-center gap-2 sm:gap-4 min-w-0'>
        <div className='relative shrink-0'>
          {/* Delete Button */}
          <button
            type='button'
            aria-label='Remove item'
            className='absolute -top-2 -left-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-md transition'
            onClick={handleDelete}
          >
            ✕
          </button>
          <img 
            src={image} 
            alt={alt || title} 
            className='w-10 h-10 sm:w-12 sm:h-12 object-contain' 
          />
        </div>
        <span className='text-xs sm:text-sm font-medium text-gray-800 truncate'>
          {title}
        </span>
      </div>

      {/* 2. Price */}
      <div className='text-center'>
        <span className='text-xs sm:text-sm text-gray-700 font-normal'>
          ${Number(price).toFixed(2)}
        </span>
      </div>

      {/* 3. Quantity Selector */}
      <div className='flex justify-center'>
        <div className='border border-gray-200 rounded flex items-center justify-between w-12 sm:w-14 py-1 px-1.5 sm:px-2 bg-white'>
          <span className='text-xs sm:text-sm font-medium'>{quantity}</span>
          <div className='flex flex-col items-center ml-1'>
            <IoIosArrowUp 
              className='cursor-pointer hover:text-blue-600 transition text-[10px] sm:text-xs' 
              onClick={handleIncrease} 
            />
            <IoIosArrowDown 
              className={`cursor-pointer transition text-[10px] sm:text-xs ${
                quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-blue-600'
              }`} 
              onClick={handleDecrease} 
            />
          </div>
        </div>
      </div>

      {/* 4. Subtotal */}
      <div className='text-right'>
        <span className='text-xs sm:text-sm font-bold sm:font-semibold text-gray-900'>
          ${(Number(price) * quantity).toFixed(2)}
        </span>
      </div>

    </div>
  )
}