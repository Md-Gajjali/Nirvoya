import Heart from '../icons/Heart';
import { Rate } from 'antd';
import Cart from '../icons/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { CartReducer, wishListReducer } from '../SliceReducer';
import { useNavigate } from 'react-router';


const Card = ({ img, rating, rate, p, id , disPar, price, disPrice, productDetails , className = '' }) => {



  const productData = productDetails || {} ;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { cart   } = useSelector((state) => state.AllProducts)
  const { wishList   } = useSelector((state) => state.AllProducts)


  const handleCart = () => {
    const matchItem = cart.find((item)=> item.id === productData.id)
    if (!matchItem) {
      dispatch(CartReducer({ ...productData, quan: 1 }))
      
    }
  }

  const AddToWishList = () => {
    const MatchItem = wishList.find((item)=> item.id === productData.id)
    if (!MatchItem) {
      dispatch(wishListReducer(productData))
    }
  }

  const handleDetails = () => {
    navigate(`/ProductDetailss/${id}`)
  }

  

  return (
    <div className={`w-[320px] bg-white p-5 rounded-xl shadow-md ${className}`}>
      <div className="relative w-full bg-[#F4F4F6] rounded-lg overflow-hidden flex items-center justify-center h-[200px]">
        <img
          src={img}
          alt={p || "Product Image"}
          className="w-full h-full object-contain p-2 cursor-pointer"
          onClick={handleDetails}
        />

        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2">
          {disPar && (
            <div className="font-semibold py-[4px] px-3 text-[13px] bg-gradient-to-r from-[#FF7A00] to-[#FFB800] rounded-tl-lg rounded-br-lg text-white">
              -{disPar}%
            </div>
          )}
          
          <button type="button" className="ml-auto  cursor-pointer p-1 hover:scale-110 transition-transform"   onClick={AddToWishList}>
            <Heart />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <Rate allowHalf defaultValue={rate} disabled className="text-sm" />
        <span className="font-medium">({rating})</span>
      </div>

      <p className="text-[15px] font-normal mt-2 line-clamp-2 text-gray-800 h-[45px]" title={p}>
        {p}
      </p>

      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="font-bold text-[20px] text-[#0970CD]">${price}</p>
          {disPrice && (
            <p className="font-medium text-[15px] text-gray-400 line-through">
              ${disPrice}
            </p>
          )}
        </div>

        <button type="button" className="p-2 hover:bg-blue-50 rounded-full transition-colors" onClick={handleCart}>
          <Cart fill="#0970CD" />
        </button>
      </div>

      
    </div>
  );
};

export default Card;