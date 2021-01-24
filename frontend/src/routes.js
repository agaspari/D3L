import React from "react";
import Login from "./pages/Login";
import Join from "./pages/Join";

const routes = [
  { name: "Join", path: "/", exact: true, main: () => <Join /> },
  { name: "Login", path: "/login", exact: true, main: () => <Login /> }
];

export default routes;