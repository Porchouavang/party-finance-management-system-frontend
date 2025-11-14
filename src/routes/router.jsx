

import { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginComponent from "../components/login/LoginComponent";
import DashboardComponent from "../components/DashboardComponent";
import PartyComponent from "../components/PartyComponenent";
function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />"
          <Route path="/party" element={<PartyComponent/>} />
        </Routes>
        <Outlet />
    </Suspense>
  )
}

export default AppRouter