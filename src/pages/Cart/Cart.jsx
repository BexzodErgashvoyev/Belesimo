import React, { useState, useRef } from "react";
import {
  PiShoppingCartSimpleFill,
  PiShoppingCartSimpleLight,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../pages/zustandStore";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Cart = ({ product }) => {
  const {
    addToFavorite,
    removeFromFavorite,
    favorite,
    cart,
    addToCart,
    removeFromCart,
  } = useStore();

  const [isFavorite, setIsFavorite] = useState(
    favorite.some((item) => item._id === product._id)
  );
  const [isCart, setIsCart] = useState(
    cart.some((item) => item._id === product._id)
  );
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
  const imgRef = useRef(null);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  if (!product || !product.images?.length) return null;

  // hover qilingan rasmni almashtirish
  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const index = Math.floor(percent * product.images.length);
    setHoveredImageIndex(
      index >= product.images.length ? product.images.length - 1 : index
    );
  };

  const handleMouseLeave = () => setHoveredImageIndex(0);

  // CART boshqarish + localStorage update
  const handleCart = () => {
    let stored = JSON.parse(localStorage.getItem("cart")) || [];

    if (isCart) {
      removeFromCart(product._id);
      setIsCart(false);

      // localStorage dan o‘chirish
      stored = stored.filter((item) => item._id !== product._id);
      localStorage.setItem("cart", JSON.stringify(stored));
    } else {
      addToCart(product);
      setIsCart(true);

      // localStorage ga qo‘shish
      stored.push({
        _id: product._id,
        name: product.name,
        img: product.images[0],
        price: product.sellPrice.toLocaleString() + " so‘m",
      });
      localStorage.setItem("cart", JSON.stringify(stored));
    }
  };

  return (
    <div className="relative w-[260px] bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition-all duration-500">
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded-md text-white ${
            product.badge === "NEW"
              ? "bg-green-600"
              : product.badge === "HIT"
              ? "bg-red-600"
              : "bg-gray-500"
          }`}
        >
          {product.badge}
        </div>
      )}

      {/* Mahsulot rasmi */}
      <div
        onClick={handleOpen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        <img
          ref={imgRef}
          src={product.images[hoveredImageIndex]}
          alt={product.name}
          className="w-[220px] h-[180px] object-contain rounded-xl mx-auto"
        />
      </div>

      {/* Modal (Dialog) */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{product.name}</DialogHeader>
        <DialogBody divider>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[250px] object-contain rounded-lg mb-4"
          />
          <p className="text-gray-700">{product.description}</p>
          <p className="mt-3 font-bold text-lg text-[#1d243f]">
            {product.sellPrice.toLocaleString()} soʻm
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleCart}
          >
            <span>{isCart ? "Savatdan olish" : "Savatga qoʻshish"}</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Nomi va tavsif */}
      <div className="mt-4 text-center">
        <h3 className="text-base font-semibold text-[#1d243f] line-clamp-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
      </div>

      {/* Narx va savat tugmasi */}
      <div className="flex justify-between items-center w-full mt-4">
        <p className="font-golos text-lg font-bold text-[#1d243f]">
          от {product.sellPrice.toLocaleString()} soʻm
        </p>
      </div>
    </div>
  );
};

export default Cart;
