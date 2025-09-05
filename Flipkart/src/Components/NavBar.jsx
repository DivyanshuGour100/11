import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaMapMarkerAlt, FaCaretDown, FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useCart } from "../Context/CartContext";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const NavBar = ({ userAddress, handleGetUserAddress }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cartItem } = useCart();

  const toggleDropDown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="bg-white py-3 shadow-2xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="flex gap-4 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-600 font-serif">Z</span>aptro
            </h1>
          </Link>

          {/* Location */}
          <div className="hidden md:flex gap-1 cursor-pointer text-gray-700 items-center">
            <FaMapMarkerAlt className="text-red-600" />
            <span className="font-semibold">
              {userAddress ? (
                <div className="-space-x-1">{userAddress}</div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown onClick={toggleDropDown} />
          </div>

          {openDropdown && (
            <div className="w-[200px] h-[70px] shadow-2xl z-50 bg-white absolute top-16 left-20 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 flex justify-between">
                <button
                  onClick={handleGetUserAddress}
                  className="py-1 cursor-pointer px-2 text-white bg-red-500 rounded-md"
                >
                  Direct Location
                </button>
                <span className="cursor-pointer" onClick={toggleDropDown}>
                  <IoMdClose />
                </span>
              </h1>
            </div>
          )}
        </div>

        {/* Menu Section Desktop */}
        <nav className="hidden md:flex gap-7 items-center">
          <ul className="flex gap-7 text-lg font-semibold">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-red-500" : ""
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/Products"}
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-red-500" : ""
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/About"}
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-red-500" : ""
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/Contact"}
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-2 border-red-500" : ""
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-sm">
              {cartItem.length}
            </span>
          </Link>

          {/* Clerk Auth */}
          <div>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-2xl"
        >
          {mobileMenu ? <IoMdClose /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <ul className="flex flex-col gap-4 text-lg font-semibold">
            <NavLink to={"/"} onClick={() => setMobileMenu(false)}>
              Home
            </NavLink>
            <NavLink to={"/Products"} onClick={() => setMobileMenu(false)}>
              Products
            </NavLink>
            <NavLink to={"/About"} onClick={() => setMobileMenu(false)}>
              About
            </NavLink>
            <NavLink to={"/Contact"} onClick={() => setMobileMenu(false)}>
              Contact
            </NavLink>
          </ul>

          {/* Cart */}
          <Link
            to={"/cart"}
            onClick={() => setMobileMenu(false)}
            className="relative flex items-center gap-2"
          >
            <IoCartOutline className="h-6 w-6" />
            <span className="bg-red-500 px-2 rounded-full text-white text-sm">
              {cartItem.length}
            </span>
          </Link>

          {/* Clerk Auth */}
          <div>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer w-full" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
