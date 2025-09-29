import React, { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useStore } from "../pages/zustandStore"; 
import Cart from "./Cart/Cart";
import Futir from "../futr/Futir";
import { Link } from "react-router-dom";

const Menyo = () => {
  const [activeTab, setActiveTab] = useState("delivery");
  const [address, setAddress] = useState("");

  const { products, categories } = useStore();

  if (!products || products.length === 0) {
    return <p className="text-center mt-10">Mahsulotlar yuklanmoqda...</p>;
  }

  return (
    <div className="mx-auto p-4 space-y-10">
      {/* 🎞 Slayder */}
      <figure className="relative w-full">
        <Carousel transition={{ duration: 2 }} className="rounded-xl">
          {[1, 2, 3, 4].map((_, i) => (
            <img
              key={i}
              src={`https://bellissimo.fra1.digitaloceanspaces.com/content-io/${
                i === 0
                  ? "77d607a3-d447-4ea7-9b85-c55f4e92637a"
                  : i === 1
                  ? "cf6ba15d-5743-4df9-b011-7fdd9f1f82bb"
                  : i === 2
                  ? "cd8da1d4-b3cb-47b3-9712-dc218102eddd"
                  : "90f9256a-8576-43ee-8f14-bcd00a9b0adc"
              }.jpg`}
              alt={`slide-${i}`}
              className="h-[550px] w-full object-cover"
            />
          ))}
        </Carousel>
      </figure>

      {/* 🚚 Dostavka / Samovyvoz */}
      <div className="container space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex bg-gray-100 rounded-full overflow-hidden">
            {["delivery", "pickup"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setAddress(""); // tab o‘zgarganda input tozalansin
                }}
                className={`px-6 py-2 rounded-full transition-all w-60 h-14 ${
                  activeTab === tab
                    ? "bg-white text-black shadow"
                    : "text-gray-500"
                }`}
              >
                {tab === "delivery" ? "Доставка" : "Самовывоз"}
              </button>
            ))}
          </div>

          {/* 📍 Manzil yoki filial input */}
          <div className="flex items-center border border-yellow-400 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg w-full max-w-md">
            <span className="flex-grow">
              {address
                ? address
                : activeTab === "delivery"
                ? "Необходимо указать адрес доставки"
                : "Выберите филиал для самовывоза"}
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={
                activeTab === "delivery" ? "Введите адрес" : "Введите филиал"
              }
              className="ml-2 px-2 py-1 border rounded-md outline-none text-black"
            />
            <PencilIcon className="h-4 w-4 ml-2 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* 📂 Kategoriyalarni chiqarish */}
   <div className="container">
  <div className="flex flex-wrap gap-3">
    {categories && categories.length > 0 ? (
      categories.map((cat) => (
        <Link
          key={cat._id}
          to={`/category/${cat.slug}`}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition text-sm font-medium"
        >
          {cat.name}
        </Link>
      ))
    ) : (
      <p className="text-gray-500">Kategoriya topilmadi</p>
    )}
  </div>
</div>


      {/* 🛒 Mahsulotlar grid */}
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Barcha mahsulotlar</h2>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Cart key={product._id} product={product} />
          ))}
        </div>
      </div>

      <Futir />
    </div>
  );
};

export default Menyo;

