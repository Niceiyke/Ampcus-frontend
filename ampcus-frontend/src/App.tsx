import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import LoanRequestPage from "./pages/LoanRequest";
import { RequiredAuth } from "./components/auth/RequiredAuth";
import Logout from "./components/Logout";
import ProfilePage from "./pages/profilePage";
import ContributionPage from "./pages/ContributionPage";
import RepaymentPage from "./pages/RepaymentPage";
import LoanDetailPage from "./pages/LoanDetailPage";
import PresidentAwaitingApprovals from "./pages/admin/PresidentAwaitingApprovals";
import { IsPresidentAuth } from "./components/auth/IsPresidentAuth";
import { IsTreasurertAuth } from "./components/auth/IsTreasurerAuth";

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        {/*protected Routes */}
        <Route element={<RequiredAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loan-request" element={<LoanRequestPage />} />
          <Route path="/change-contribution" element={<ContributionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/loan-repayment" element={<RepaymentPage />} />

          <Route path="/loan-detail/:loanId" element={<LoanDetailPage />} />
          {/* President only  Access */}
          <Route element={<IsPresidentAuth />}>
            <Route
              path="/admin/awaiting-presinent-approvals"
              element={<PresidentAwaitingApprovals />}
            />
          </Route>
          {/* Treasurer only  Access */}
          <Route element={<IsTreasurertAuth />}>
            <Route
              path="/admin/awaiting-presinent-approvals"
              element={<PresidentAwaitingApprovals />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
