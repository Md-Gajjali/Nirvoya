import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { CartItems } from "../Components/CartItem";

export default function CartPage() {


  const { cart: CartItem } = useSelector((state) => state.AllProducts)

  const { subTotal: subTotalPrice } = useSelector((state) => state.AllProducts)



  return (
    <div className="max-w-[1400px] mx-auto p-6 font-sans text-gray-900">
      {/* Table Headers */}
      <div className="flex items-center justify-between py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-6 font-medium text-gray-700 text-sm">
        <span className="w-1/4 text-left">Product</span>
        <span className="w-1/4 text-center">Price</span>
        <span className="w-1/4 text-center">Quantity</span>
        <span className="w-1/4 text-right">Subtotal</span>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4">
        {CartItem.map((item) => (
          <CartItems
            key={item.id}
            id={item.id}
            title={item.title}
            alt={item.title}
            image={item.thumbnail}
            price={item.price}
            quantity={item.quan}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center my-8">
        <button className="px-8 py-3 border border-gray-400 rounded text-sm font-medium hover:bg-gray-100 transition">
          Return To Shop
        </button>
        <button className="px-8 py-3 border border-gray-400 rounded text-sm font-medium hover:bg-gray-100 transition">
          Update Cart
        </button>
      </div>

      {/* Bottom Section: Coupon & Checkout Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-12">
        {/* Coupon Code Section */}
        <div className="flex gap-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Coupon Code"
            // value={coupon}
            // onChange={(e) => setCoupon(e.target.value)}
            className="w-full max-w-xs px-4 py-3 border border-gray-400 rounded text-sm focus:outline-none focus:border-[#0198E9]"
          />
          <button className="px-8 py-3 bg-[#0198E9] text-white text-sm font-medium rounded hover:opacity-90 transition">
            Apply Coupon
          </button>
        </div>

        <div className="w-full md:w-96 border border-gray-800 rounded p-6">
          <h2 className="text-lg font-semibold mb-6">Cart Total</h2>

          <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${subTotalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium text-gray-700">Free</span>
          </div>

          <div className="flex justify-between py-3 font-semibold text-base">
            <span>Total:</span>
            <span>${subTotalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full mt-4 py-3 bg-[#0198E9] text-white text-sm font-medium rounded hover:opacity-90 transition">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}