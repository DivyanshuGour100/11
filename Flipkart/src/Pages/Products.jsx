import React, { useEffect, useState } from "react";
import { getData } from "../Context/DataContext";
import FilterSection from "../Components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../Components/ProductCard";
import Pageination from "../Components/Pageination";

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        {filteredData?.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Section */}
            <div className="w-full md:w-1/4">
              <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />
            </div>

            {/* Product List Section */}
            <div className="w-full md:w-3/4 flex flex-col justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
                {filteredData
                  ?.slice(page * 8 - 8, page * 8)
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
              </div>

              <Pageination
                pageHandler={pageHandler}
                page={page}
                dynamicPage={dynamicPage}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
