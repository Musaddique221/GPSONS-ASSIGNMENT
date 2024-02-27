"use client";
import React from "react";
import { useState, useEffect, MouseEvent } from "react";
import Loader from "@/components/Loader";
import { usePathname } from "next/navigation";

import axios from "axios";
const CartScreen: React.FC = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [orders, setOrders] = useState<products[]>([]);
  const [userFromLocal, setUserFromLocal] = useState<any>();
  const path = usePathname();

  const id = path.split("/")[2];

  interface products {
    _id: string;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    price: number;
  }

  const getMyOrders = async () => {
    try {
      const { data } = await axios.get<products[]>(
        `http://localhost:5000/cart/${id}`
      );
      console.log(data, "19");
      setShowLoader(false);
      setOrders(data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const deleteHandler = async (productId: string) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/cart/${productId}`
      );
      window.location.reload();
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
    <>
      <div className="container w-full mx-auto pt-20">
        <div className="w-full mb-8">
          <h1 className="text-3xl text-center font-bold">Your Shopping Cart</h1>
        </div>
        {orders.map((product: any) => {
          return (
            <>
              <div className="flex flex-col">
                <div className="flex items-center mb-5 pl-10">
                  <img
                    className="h-16 w-16 object-cover rounded"
                    src={product.image}
                    alt="Item Image"
                  />

                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-600">{product.price}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteHandler(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CartScreen;
