import { Route, Routes } from "react-router-dom";
import Layout from "./ults/Layout";
import Menyo from "./pages/Menyo";
import Karzinka from "./pages/Karzinka";
import { useEffect } from "react";
import axios from "axios";
import Categoty from "./pages/categoriya/Categoty";
import Cart from "./pages/Cart/Cart";
import { useStore } from "./pages/zustandStore"; 
import Login from "./login/Login";
import { useQuery, useMutation } from "@tanstack/react-query";
import Register from "./login/Register";


// 🔹 API funksiyalar
const getProducts = async () => {
  const res = await axios.get("http://localhost:4200/products");
  return res.data.products || res.data;
};

const loginFunction = async () => {
	try {
		const login = await axios.post('http://localhost:4200/auth/login', {
			username: 'bexzod01',
			password: 'bexzod2010',
		});

		return login;
	} catch (error) {
		return error.message;
	}
};

const App = () => {
  const { setCategories, setProducts } = useStore();


  const products = useQuery({ queryKey: ["products"], queryFn: getProducts });


  useEffect(() => {
    async function getInitialData() {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:4200/categories"),
          axios.get("http://localhost:4200/products"),
        ]);

        if (Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data);
        } else if (categoriesRes.data.categories) {
          setCategories(categoriesRes.data.categories);
        }

        if (Array.isArray(productsRes.data)) {
          setProducts(productsRes.data);
        } else if (productsRes.data.products) {
          setProducts(productsRes.data.products);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Server xatolik:", err.response?.data || err.message);
        } else {
          console.error("Noma'lum xatolik:", err);
        }
      }
    }

    getInitialData();
  }, [setCategories, setProducts]);

  // 🔹 login mutation
  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFunction,
    onSuccess: (data) => {
      console.log("✅ Login success:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    },
  });

  return (
    <div>
      {/* <button
  onClick={() =>
    login.mutate({
      username: "bexzod01",  
      password: "bexzod2010",   
    })
  }
>
  Login Test
</button> */}


      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Menyo />} />
          <Route path="basket" element={<Karzinka />} />
          <Route path="category/:slug" element={<Categoty />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;




