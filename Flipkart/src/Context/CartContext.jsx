import { useContext } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (product)=>{
    const itemInCart = cartItem.find((item)=> item.id === product.id)
    if(itemInCart){
      // incress quantity if  already in cart
      const updateCart = cartItem.map((item)=>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCartItem(updateCart)
      toast.success("Product Quintity incress!")
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }])
      toast.success("Product is added to cart!")
    }
    
  }

const updateQuantity = ( productId, action) => {
  setCartItem(
    cartItem.map(item => {
      if (item.id === productId) {
        let newUnit = item.quantity;
        if (action === "increase") {
          newUnit = newUnit + 1;
          toast.success("Quantity is increased ")
        } else if (action === "decrease") {
          newUnit = newUnit - 1;
          toast.success("Quantity is decrease ")

        }
        return newUnit > 0 ? { ...item, quantity: newUnit } : null;
      }
      return item;
    }).filter(item => item != null)
  );
};

const deleteItem = (productId)=>{
  setCartItem(cartItem.filter(item=> item.id !== productId))
  toast.success("Product is Deleted From Cart !")
}
  
  return (
    <CartContext.Provider value={{ cartItem, setCartItem,addToCart,updateQuantity,deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = ()=> useContext(CartContext)


