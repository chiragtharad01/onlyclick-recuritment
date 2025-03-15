import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Routers from "./Routers";
export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  },[]);
  return <Routers />;
}
