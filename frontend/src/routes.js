import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

const routes = [
  { name: "Register", path: "/", exact: true, main: () => <Register /> },
  { name: "Login", path: "/login", exact: true, main: () => <Login /> }
];

export default routes;