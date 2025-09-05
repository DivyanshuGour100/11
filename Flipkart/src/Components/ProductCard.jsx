import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';


const ProductCard = ({product}) => {
  const navigate = useNavigate()
  const {addToCart,cartItem} = useCart() 
   console.log(cartItem);
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer
    hover:shadow-2xl transition-all p-2 h-max'>
      <img src={product.image} alt="" className='bg-gray-100 aspect-square' onClick={()=>navigate(`/products/${product.id}`)}/>
      <h1 className='line-clamp-2 p-1 font-semibold'>{product.title}</h1>
      <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
      <button onClick={()=>addToCart(product)} className='bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 
      items-center justify-center font-semibold'><FaCartPlus className='w-6 h-6' />
       Add to Cart</button>
    </div>
  )
}

export default ProductCard
