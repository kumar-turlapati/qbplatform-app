
import React, { createContext, useContext, useEffect, useState } from 'react';


export const ShoppingCartContext = createContext({
  cartItems: [],
  setCartItems: null,
  updated: false,
  setUpdated: null,
  selectedCustomerName: '',
  setSelectedCustomerName: null,

  clearCartInfo: null,
  addToCart: null,
  updateCart: null
});

export const ShoppingCartProvider = (props) => {

  const [cartItems, setCartItems] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');

  const clearCartInfo = () => {
    setCartItems([]);
  };

  const addToCart = (itemDetails) => {
    let updateItems = cartItems
    updateItems.push(itemDetails)
    setCartItems(updateItems)
  };

  const updateCart = (index) => {
    let updateItems = cartItems
    updateItems.splice(index, 1)
    setCartItems(updateItems)
    setUpdated(!updated)
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        setCartItems,
        updated,
        setUpdated,
        selectedCustomerName,
        setSelectedCustomerName,

        clearCartInfo,
        addToCart,
        updateCart
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
