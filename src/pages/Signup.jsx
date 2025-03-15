// import React, { useState } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../AuthContext";

// export default function Signup() {
//     const { register, handleSubmit, getValues, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   // Form submission
//   const onSubmit = async (data) => {
//     setLoading(true);

//     // Here you would make a request to your API to register the user
//     // For now, let's simulate a successful signup
//     setTimeout(() => {
//       setLoading(false);
//       console.log("User signed up", data);
//       // On successful signup, redirect to login
//       navigate("/");
//     }, 2000);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-600">
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-xl w-96 transition-transform hover:scale-105">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Signup</h2>

//         {/* Email Input */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
//           {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
//         />
//         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//         {/* Password Input */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
//           {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
//         />
//         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//         {/* Confirm Password */}
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
//           {...register("confirmPassword", {
//             required: "Please confirm your password",
//             validate: value => value === getValues("password") || "Passwords don't match"
//           })}
//         />
//         {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

//         {/* Signup Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md transition-all"
//         >
//           {loading ? "Signing up..." : "Sign Up"}
//         </button>
        
//         <p className="text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <Link to="/" className="text-blue-700 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext"; // Import AuthContext
import { signupApi } from "../apiService"; // Import signup API function

export default function Signup() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth(); // Access signup function from AuthContext

  // Form submission
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Call the signup API function to register the user
      const response = await signupApi(data.email, data.password);
      
      // Simulate saving the user info in AuthContext
      signupApi(response.user); // Store user in AuthContext (you can adjust the data as needed)
      
      // Redirect to the login page after successful signup
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle signup error (e.g., show a message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-600">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-xl w-96 transition-transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Signup</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
          {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition-all mb-2"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: value => value === getValues("password") || "Passwords don't match"
          })}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md transition-all"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
