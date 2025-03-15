



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../AuthContext";

// export default function Login() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth(); // Access Auth Context

//   const onSubmit = async (data) => {
//     setLoading(true);
    
//     setTimeout(() => {
//       setLoading(false);
//       console.log("User logged in", data);
//       login(data); // Store user in AuthContext
//       navigate("/dashboard"); // Redirect to Dashboard
//     }, 2000);
//   };

//   return (

// <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-600">
// <form
//   onSubmit={handleSubmit(onSubmit)}
//   className="bg-white p-8 rounded-lg shadow-xl w-96 transition-transform hover:scale-105"
// >
//   <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>

//   {/* Email Input */}
//   <input
//     type="email"
//     placeholder="Email"
//     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
//     {...register("email", { required: "Email is required" })}
//   />
//   {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//   {/* Password Input */}
//   <input
//     type="password"
//     placeholder="Password"
//     className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
//     {...register("password", { required: "Password is required" })}
//   />
//   {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//   {/* Login Button */}
//   <button
//     type="submit"
//     disabled={loading}
//     className="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md transition-all"
//   >
//     {loading ? "Logging in..." : "Login"}
//   </button>

//   {/* Signup Link */}
//   <p className="text-sm mt-4 text-center">
//     Don't have an account?{" "}
//     <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
//       Sign up
//     </Link>
//   </p>
// </form>
// </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext"; // Import AuthContext
import { loginApi } from "../apiService"; // Import login API function

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      // Call the login API function and get the token
      const response = await loginApi(data.email, data.password);
      
      // Simulate saving the token in AuthContext
      login(response.token); // Store token in AuthContext
      navigate("/dashboard"); // Redirect to Dashboard after successful login
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show a message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-96 transition-transform hover:scale-105"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Login</h2>

        {/* Email Input */}
        {/* <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
          {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password Input */}
        {/* <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
