import React, { useContext, useEffect } from "react";
import { DataContext } from "../Context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Category from "./Category";

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);
  console.log(data);

  useEffect(() => {
    fetchAllProducts();
  }, []);
  var settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    pauseOnHover:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0,7)?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
            >
              <div className="flex flex-col md:flex-row gap-10 justify-center md:h-[600px] items-center px-4 py-10">
                <div className="space-y-6">
                  <h3 className="text-red-500 font-semibold font-sans text-sm">
                    Powering Your World withe the best in the Best in
                    Electronics
                  </h3>
                  <h1 className="text-4xl font-bold uppercase line-clamp-3 md:w-[500px] text-white">
                    {item.title}
                  </h1>
                  <p
                    className="md:w-[500px] line-clamp-3 text-gray-400
                  pr-7"
                  >
                    {item.description}
                  </p>
                  <button
                    className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md
                  cursor-pointer mt-2"
                  >
                    Shop Now
                  </button>
                </div>
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-full w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
                  />
                </div>
              </div>
            </div>
          );
        })}
     
      </Slider>
      <Category/>
    </div>
  );
};

export default Carousel;
