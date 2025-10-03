// src/login/Register.jsx
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 🔹 Foydalanuvchini ro‘yxatdan o‘tkazish
      const res = await axios.post("http://localhost:4200/auth/register", {
        username: data.username,
        password: data.password,
      });

      // 🔹 Agar token qaytsa — localStorage ga saqlaymiz
if (res.data?.token) {
  localStorage.setItem("token", res.data.token);
  navigate("/"); // ro‘yxatdan o‘tishdan keyin bosh sahifaga yuboradi
} else {
  alert("✅ Ro‘yxatdan o‘tish muvaffaqiyatli, lekin token kelmadi!");
  navigate("/login");
}

    } catch (err) {
      console.error("❌ Register xato:", err);
      alert(err.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f8f9]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-6 rounded-lg space-y-4 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center">Ro‘yxatdan o‘tish</h2>

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
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Parol majburiy",
            pattern: {
              value:
                /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
              message:
                "Parol 8 ta belgidan uzun, katta-kichik harf va raqam/simvol bo‘lishi kerak",
            },
          })}
          className="block border rounded px-3 py-2 w-full"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          {isSubmitting ? "Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
        </button>

        {/* Login sahifaga link */}
        <p className="text-center text-sm text-gray-600">
          Akkountingiz bormi?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
