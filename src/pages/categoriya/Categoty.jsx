import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const handleOpen = () => setOpen(!open);


  const handleCart = () => {
  let stored = JSON.parse(localStorage.getItem("cart")) || [];

  if (isCart) {
    stored = stored.filter((item) => item._id !== product._id);
    localStorage.setItem("cart", JSON.stringify(stored));
    setIsCart(false);
  } else {
    // 🟢 Savat uchun mos formatda obyekt qo'shish
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.sellPrice ?? product.fullPrice ?? 0,
      img: product.images?.[0] ?? "",
      quantity: 1,
    };

    stored.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(stored));
    setIsCart(true);
  }
};


  const imageUrl =
    product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white flex flex-col">
      {/* Rasm */}
      {imageUrl ? (
        <img
          onClick={handleOpen}
          src={imageUrl}
          alt={product.name || "product image"}
          className="w-full h-48 object-cover rounded-md mb-3 cursor-pointer"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-md mb-3">
          <span className="text-gray-400">Rasm yo‘q</span>
        </div>
      )}

      {/* Meta */}
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2 line-clamp-2">
        {product.description ?? ""}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <div>
          <div className="text-yellow-600 font-semibold">
            {product.sellPrice?.toLocaleString() ?? product.fullPrice?.toLocaleString() ?? "—"} soʻm
          </div>
          {product.fullPrice &&
            product.sellPrice &&
            product.fullPrice > product.sellPrice && (
              <div className="text-xs text-gray-400 line-through">
                {product.fullPrice.toLocaleString()} soʻm
              </div>
            )}
        </div>

        <button
          onClick={handleOpen}
          className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded"
        >
          Batafsil
        </button>
      </div>

      {/* Modal (Dialog) */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{product.name}</DialogHeader>
        <DialogBody divider>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-[250px] object-contain rounded-lg mb-4"
          />
          <p className="text-gray-700">{product.description}</p>
          <p className="mt-3 font-bold text-lg text-[#1d243f]">
            {product.sellPrice?.toLocaleString()} soʻm
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleCart}>
            <span>{isCart ? "Savatdan olish" : "Savatga qoʻshish"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

const Category = () => {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4200/categories");
        const data = res.data;

        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.categories)) arr = data.categories;

        if (isMounted) setCategories(arr);
      } catch (err) {
        console.error("Kategoriya olishda xato:", err);
        if (isMounted) setError("Kategoriya olishda xato!");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500 p-10">⏳ Yuklanmoqda...</div>
    );

  if (error)
    return <div className="text-center text-red-600 p-10">{error}</div>;

  const safeSlug = slug ? String(slug).toLowerCase() : "";

  const categoryData = categories.find(
    (cat) =>
      String(cat._id) === String(slug) ||
      (cat.slug && String(cat.slug).toLowerCase() === safeSlug) ||
      (cat.name && String(cat.name).toLowerCase() === safeSlug) ||
      (cat.categoryName && String(cat.categoryName).toLowerCase() === safeSlug)
  );

  if (!categoryData)
    return (
      <div className="text-center text-red-600 p-10">
        Bunday kategoriya topilmadi ❌
      </div>
    );

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {categoryData.categoryName ??
              categoryData.name ??
              categoryData.slug}
          </h1>
          {categoryData.description && (
            <p className="text-gray-600 mt-2">{categoryData.description}</p>
          )}
        </div>

        {/* Kategoriya rasmi */}
        {(categoryData.image || categoryData.images?.length > 0) && (
          <div className="w-full md:w-48 h-32 md:h-20 overflow-hidden rounded-md">
            <img
              src={categoryData.image || categoryData.images?.[0]}
              alt={categoryData.categoryName || categoryData.name || "category"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Mahsulotlar</h2>

        {categoryData.products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryData.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">Mahsulotlar hali mavjud emas.</div>
        )}
      </div>
    </div>
  );
};

export default Category;
