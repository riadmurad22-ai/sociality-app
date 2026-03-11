import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert("Registrasi Berhasil (Demo Mode)");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl text-white">
        <h1 className="text-4xl font-bold text-purple-500 text-center mb-6">
          Join Sociality
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
