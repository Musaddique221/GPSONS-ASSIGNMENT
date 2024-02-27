"use client";
import React from "react";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

import axios from "axios";
const CartScreen = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [orders, setOrders] = useState([]);
  const [userFromLocal, setUserFromLocal] = useState<any>();

  const getMyOrders = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/cart", {
        user: userFromLocal.data.user,
      });
      setShowLoader(false);
      setOrders(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData: any = window.localStorage.getItem("user");
      const user: any = JSON.parse(storedData);
      setUserFromLocal(user);
    }
  }, []);

  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <div className="container w-full mx-auto pt-20">
      <div className="w-full mb-8">
        <h1 className="text-3xl text-center font-bold">Your Shopping Cart</h1>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center mb-5 pl-10">
          <img
            className="h-16 w-16 object-cover rounded"
            src=""
            alt="Item Image"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Item Name</h2>
            <p className="text-sm text-gray-600">
              Item description lorem ipsum dolor sit amet.
            </p>
            <p className="text-sm text-gray-600">Price: $19.99</p>
          </div>
        </div>

        <div className="flex items-center mb-5">
          <img
            className="h-16 w-16 object-cover rounded"
            src="https://via.placeholder.com/150"
            alt="Item Image"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Another Item</h2>
            <p className="text-sm text-gray-600">
              Another item description dolor sit amet consectetur.
            </p>
            <p className="text-sm text-gray-600">Price: $24.99</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xl font-semibold">Total: $44.98</p>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
