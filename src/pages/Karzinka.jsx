import React, { useState, useMemo } from "react";

function parsePrice(value) {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  const cleaned = String(value).replace(/[^\d.]/g, "");
  if (!cleaned) return 0;
  return parseFloat(cleaned);
}

export default function Karzinka() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    const arr = stored ? JSON.parse(stored) : [];
    return arr.map((it) => ({ ...it, quantity: it.quantity ?? 1 }));
  });

  const updateQuantity = (index, delta) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const currentQty = updated[index].quantity || 1;
      let newQty = currentQty + delta;
      if (newQty < 1) newQty = 1;
      updated[index] = { ...updated[index], quantity: newQty };
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const grandTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const base = parsePrice(item.price);
      const qty = item.quantity ?? 1;
      return acc + base * qty;
    }, 0);
  }, [cartItems]);

  const format = (num) =>
    num.toLocaleString(undefined, { maximumFractionDigits: 0 });

  // 🔹 Zakaz berish
  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("❌ Savat bo‘sh, zakaz berolmaysiz!");
      return;
    }
    // Hozircha oddiy alert – keyin backendga POST yuborish mumkin
    alert(`✅ Zakazingiz qabul qilindi!\nJami summa: ${format(grandTotal)} so‘m`);

    // Zakaz berilgach savatni tozalash
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🛒 Savatdagi Mahsulotlar
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Savat bo‘sh</p>
      ) : (
        <>
          {cartItems.map((item, idx) => {
            const basePrice = parsePrice(item.price);
            const quantity = item.quantity || 1;
            const total = basePrice * quantity;

            return (
              <div
                key={idx}
                className="mb-4 border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-gray-100 rounded-lg px-2">
                          <button
                            onClick={() => updateQuantity(idx, -1)}
                            className="px-3 text-lg font-bold select-none"
                          >
                            –
                          </button>
                          <span className="px-3">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(idx, 1)}
                            className="px-3 text-lg font-bold select-none"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold">{format(total)} so‘m</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-red-500 font-medium hover:underline"
                  >
                    Olib tashlash
                  </button>
                </div>
              </div>
            );
          })}

          {/* Jami summa + Zakaz tugmasi */}
          <div className="mt-6 p-4 border rounded-lg bg-white text-right">
            <div className="text-gray-600">Jami:</div>
            <div className="text-2xl font-bold">{format(grandTotal)} so‘m</div>
            <button
              onClick={handleOrder}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              ✅ Zakaz berish
            </button>
          </div>
        </>
      )}
    </div>
  );
}
