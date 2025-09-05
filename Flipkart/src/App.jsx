import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Pages/Home.jsx'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Products from './Pages/Products'
import NavBar from './Components/NavBar.jsx';
import axios from 'axios'
import Footer from './Components/Footer.jsx';
import SingleProduct from './Pages/SingleProduct.jsx';


const App = () => {

const [latitude,setLatitude] = useState()
const [longitude,setLongitude] = useState()
const [userAddress,setUserAddress] = useState()

const geo = navigator.geolocation

geo.getCurrentPosition(userCoords)
function userCoords(position){
  let userLatitude = position.coords.latitude
  let userLongitude= position.coords.longitude
  // console.log("Latitude:",userLatitude);
  // console.log("Longitude:",userLongitude);
  setLatitude(userLatitude)
  setLongitude(userLongitude)  
}

const getUserAddress = async()=>{
  let url =`https://api.opencagedata.com/geocode/v1/json?key=33cf26ad3ff44aa4883afc450afcaa9b&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`

  const loc = await fetch(url)
  const data = await loc.json()
  console.log("use Address:",data);
  setUserAddress(data.results[0].formatted)
}

const handleGetUserAddress=()=>{
  getUserAddress()
  console.log(getUserAddress);
  
}

  return (
   <BrowserRouter>
    <NavBar userAddress={userAddress}
    handleGetUserAddress={handleGetUserAddress}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Products' element={<Products/>}></Route>
        <Route path='/Products/:id' element={<SingleProduct/>}></Route>
        <Route path='/About' element={<About/>}></Route>
        <Route path='/Contact' element={<Contact/>}></Route>
        <Route path='/Cart' element={<Cart location={location} getUserAddress={getUserAddress}/>}></Route>
      </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export default App
