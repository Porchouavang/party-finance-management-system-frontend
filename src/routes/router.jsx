

import { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginComponent from "../components/login/LoginComponent";
import DashboardComponent from "../components/DashboardComponent";
import PartyComponent from "../components/PartyComponenent";
import OwnerPartyComponent from "../components/OwnerPartyComponent";
import FinanceComponent from "../components/FinanceComponent";
import IncomeComponent from "../components/IncomeComponent";
import ExpenditureComponent from "../components/ExpenditureComponent";
import NoteComponent from "../components/NoteComponent";
import NoteDetailsComponent from "../components/NoteDetailsComponent";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check for token

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
function AppRouter() {
  // const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
  //   !!localStorage.getItem("token")
  // );

  // useEffect(() => {
  //   setIsAdminLoggedIn(!!localStorage.getItem("token"));
  // }, []);

  // const handleAdminLogin = () => {
  //   setIsAdminLoggedIn(true);
  // };
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardComponent />} />"
          <Route path="/party/:id" element={<PartyComponent/>} />
          <Route path="/ownerparty/:id" element={<OwnerPartyComponent/>} />
          <Route path="/finance/:id" element={<FinanceComponent/>} />
          <Route path="/income/:id" element={<IncomeComponent/>}/>
          <Route path="/expenditure/:id" element={<ExpenditureComponent/>}/>
          <Route path="/note/:id" element={<NoteComponent/>}/>
          <Route path="/note-detail/:id" element={<NoteDetailsComponent/>}/>
          </Route>
        </Routes>
        <Outlet />
    </Suspense>
  )
}

export default AppRouter