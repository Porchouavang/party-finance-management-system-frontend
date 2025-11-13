

import { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginComponent from "../components/login/LoginComponent";
import DashboardComponent from "../components/DashboardComponent";
function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />"
        </Routes>
        <Outlet />
    </Suspense>
  )
}

export default AppRouter