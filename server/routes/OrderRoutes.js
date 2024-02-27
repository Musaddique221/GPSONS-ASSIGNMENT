import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

/**
 * @desc		Create new order
 * @route		POST/orders
 * @access	public
 */

const addOrderItems = asyncHandler(async (req, res) => {
  const { name, image, category, brand, description, price, user } = req.body;

  const order = new Order({
    user,
    name,
    image,
    category,
    brand,
    description,
    price,
  });

  if (order) {
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  } else {
    res.status(400);
    throw new Error("Something Went wrong");
  }
});

/**
 * @desc		Get logged in user's orders
 * @route		GET /myorders
 * @access	private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const { user } = req.body;
  console.log(user, "39")
  try {
    const orders = await Order.findById(user);
    res.json(orders);
  } catch (err) {
    res.json(err.message);
  }
});

export { addOrderItems, getMyOrders };
