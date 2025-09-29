import React from "react";
import { Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { useStore } from "../pages/zustandStore"; // ✅ to‘g‘ri import
import { useQueryClient } from "@tanstack/react-query";

export const Header = () => {
  const { cart } = useStore(); // 🛒 cartni olish
  // const queryClinet = useQueryClient();


  // console.log(queryClinet.getQueryData("products"));
  

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 text-red-600 font-bold text-xl ">
        <Link to={"/"}>
          <img
            src="https://imas.uz/img/Bellissimo_Pizza_logo.png"
            alt="Bellissimo Pizza Logo"
            className="h-20"
          />
        </Link>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
        <img
          src="https://cdn-icons-png.flaticon.com/512/535/535239.png"
          alt="Location Icon"
          className="w-5 h-5"
        />
        <div className="leading-4">
          <span className="text-gray-500">Город:</span>
          <br />
          <strong className="text-green-700">Ташкент ⌄</strong>
        </div>
      </div>

      {/* 24/7 Info */}
      <div className="flex flex-col items-center bg-gray-100 px-3 py-2 rounded-lg text-sm leading-tight text-center">
        <span className="font-bold text-gray-800">24/7</span>
        <span className="text-gray-600">
          Бесплатная доставка
          <br />
          теперь доступна 24/7
        </span>
      </div>

      {/* Coin balance */}
      <div className="flex items-center gap-1 font-bold text-gray-700">
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/75/72/bitcoin-icon-for-internet-money-crypto-currency-vector-17847572.jpg"
          alt="Coin"
          className="h-8"
        />
        <span>1000</span>
      </div>

      {/* Basket */}
      <div className="relative">
        <Link to={"/basket"}>
          <SlBasket className="text-2xl" />
        </Link>
        {/* 🛒 Cartdagi mahsulotlar soni */}
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
            {cart.length}
          </span>
        )}
      </div>

      {/* Login Button */}
      <Link to={"/Login"}>
      <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-full">
        Войти
      </button>
      </Link>
    </header>
  );
};

export default Header;
