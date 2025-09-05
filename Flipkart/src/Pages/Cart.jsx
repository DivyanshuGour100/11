import React from "react";
import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import emptycart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

const Cart = ({ getUserAddress }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

          {/* Cart Items */}
          <div className="mt-10 space-y-3">
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-5 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-md"
                  />
                  <div>
                    <h1 className="w-[250px] sm:w-[300px] line-clamp-2">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                  <button
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, "decrease")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, "increase")}
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <span
                  onClick={() => deleteItem(item.id)}
                  className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                >
                  <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                </span>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-10">
            {/* Left Side - Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 space-y-2">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>

              <div className="flex flex-col space-y-1">
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-2 rounded-md bg-white"
                  value={user?.fullName || "Guest"}
                  readOnly
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  placeholder="Enter your Address"
                  className="p-2 rounded-md bg-white"
                />
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">State</label>
                  <input
                    type="text"
                    placeholder="Enter Your State"
                    className="p-2 rounded-md w-full bg-white"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Post Code</label>
                  <input
                    type="text"
                    placeholder="Enter Your Post Code"
                    className="p-2 rounded-md w-full bg-white"
                  />
                </div>
              </div>

              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    placeholder="Enter Your Country"
                    className="p-2 rounded-md w-full bg-white"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Your Number"
                    className="p-2 rounded-md w-full bg-white"
                  />
                </div>
              </div>

              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                Submit
              </button>

              <div className="flex items-center justify-center w-full text-gray-700">
                ------------OR-----------
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-red-500 text-white cursor-pointer px-3 py-2 rounded-md"
                  onClick={getUserAddress}
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* Right Side - Bill Details */}
            <div className="bg-white border-gray-100 shadow-xl rounded-md p-7 h-max w-full md:w-[350px] space-y-4">
              <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>

              <div className="flex items-center justify-between">
                <h1 className="flex gap-1 items-center">
                  <LuNotebookText /> Item Total
                </h1>
                <p>${totalPrice}</p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center">
                  <MdDeliveryDining /> Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">$25</span> Free
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center">
                  <GiShoppingBag /> Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">$5</p>
              </div>

              <hr className="text-gray-200" />

              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Grand Total</h1>
                <p className="font-semibold text-lg">${totalPrice + 5}</p>
              </div>

              <h1 className="font-semibold text-gray-700 mb-2 mt-5">
                Apply Promo Code
              </h1>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter Code"
                  className="p-2 rounded-md w-full border border-gray-200 bg-white"
                />
                <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                  Apply
                </button>
              </div>

              <div>
                <button className="bg-red-500 text-white px-3 py-2 mt-3 rounded-md w-full cursor-pointer">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart */
        <div className="flex flex-col justify-center h-[600px] items-center text-center">
          <h1 className="text-red-500/80 font-bold text-3xl sm:text-5xl mb-5">
            Oh no! Your Cart is empty
          </h1>
          <img src={emptycart} alt="" className="w-[250px] sm:w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white py-2 px-3 mt-5 rounded-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
