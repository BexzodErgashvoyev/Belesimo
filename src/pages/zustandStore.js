// src/pages/zustandStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

export const useStore = create(
  persist(
    (set) => ({
      // 🔹 asosiy state
      cart: [],
      favorite: [],
      compareList: [],

      // 🛒 CART funksiyalari
      addToCart: (product) =>
        set((state) => {
          if (state.cart.find((item) => item._id === product._id)) return state;
          return { cart: [...state.cart, product] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      // ❤️ FAVORITE funksiyalari
      addToFavorite: (product) =>
        set((state) => {
          if (state.favorite.find((item) => item._id === product._id)) return state;
          return { favorite: [...state.favorite, product] };
        }),

      removeFromFavorite: (id) =>
        set((state) => ({
          favorite: state.favorite.filter((item) => item._id !== id),
        })),

      clearFavorite: () => set({ favorite: [] }),

      // 🔄 COMPARE funksiyalari
      addToCompare: (product) =>
        set((state) => {
          if (state.compareList.find((item) => item._id === product._id)) return state;
          return { compareList: [...state.compareList, product] };
        }),

      removeFromCompare: (id) =>
        set((state) => ({
          compareList: state.compareList.filter((item) => item._id !== id),
        })),

      clearCompare: () => set({ compareList: [] }),

      // 📦 mahsulotlar va kategoriyalar
      products: [],
      setProducts: (arr) => set({ products: arr }),

      categories: [],
      setCategories: (arr) => set({ categories: arr }),

      // 🔑 token (login uchun)
      token: null,
      setToken: (data) => set({ token: data }),
    }),
    {
      name: "Bellissimo", // 🍪 cookie nomi
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const data = Cookies.get(key);
          return data ? JSON.parse(data) : null;
        },
        setItem: (key, value) => {
          Cookies.set(key, JSON.stringify(value), { expires: 7 }); // 7 kun saqlanadi
        },
        removeItem: (key) => Cookies.remove(key),
      })),
    }
  )
);
