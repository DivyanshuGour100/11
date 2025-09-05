import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../Components/Breadcrums";
import { FaCartPlus } from "react-icons/fa";

const SingleProduct = () => {
  const params = useParams();
  const [SingleProduct, setSingleProduct] = useState("");
  console.log(params);

  const getSigleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/${params.id}`
      );
      const product = res.data.product;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSigleProduct();
  }, []);

  const OriginalPrice = Math.round(
    SingleProduct.price + (SingleProduct.price * SingleProduct.discount) / 100
  );

  return (
    <>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={SingleProduct.title} />
          <div className="max-w-6xl mx-auto md:pd-6 grid grid-cols-2 gap-10">
            {/*Product Image*/}
            <div className="w-full">
              <img
                src={SingleProduct.image}
                alt={SingleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/*Product Ditels*/}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl font-bold text-gray-800">
                {SingleProduct.title}
              </h1>
              <div className="text-gray-700">
                {SingleProduct.brand?.toUpperCase()}/
                {SingleProduct.Category?.toUpperCase()}/{SingleProduct.model}
              </div>
              <p className="text-xl text-red-500 font-bold">
                ${SingleProduct.price}{" "}
                <span className="line-through text-gray-700">
                  ${OriginalPrice}
                </span>
                <span className="bg-red-500 text-white rounded-md py-2 px-4 ml-5">
                  {SingleProduct.discount}% discount
                </span>
              </p>
              <p className="text-gray-600">{SingleProduct.description}</p>
              {/* quanatity selector*/}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  value={1}
                  className="w-20 border border-gray-400 rounded-lg
                  px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button className="px-6 flex cursor-pointer rounded-md gap-2 py-2 text-lg bg-red-500 text-white">
                  <FaCartPlus className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
