import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    try {
      // 🔹 backendga login request
      const res = await axios.post("http://localhost:4200/auth/login", {
        username: data.username,
        password: data.password,
      });
        if (res.data?.token) {
        // 🔹 tokenni saqlash
        localStorage.setItem("token", res.data.token);
        navigate("/"); // login bo‘lgandan keyin /menu ga o‘tkazadi
      } else {
        alert("Login muvaffaqiyatli, lekin token kelmadi!");
      }
    } catch (err) {
      console.error("❌ Login xato:", err);
      alert(err.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f8f9]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-6 rounded-lg space-y-4 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center">Kirish</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username majburiy" })}
          className="block border rounded px-3 py-2 w-full"
        />
        {errors.username && (
          <p className="text-red-600 text-sm">{errors.username.message}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Parol majburiy" })}
            className="block border rounded px-3 py-2 w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {show ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          {isSubmitting ? "Kirilmoqda..." : "Login"}
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600">
          Akkountingiz yo‘qmi?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;



