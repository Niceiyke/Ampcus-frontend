import React from "react";
import Navbar from "../components/Navbar";
import SplitScreen from "../layouts/SplitScreen";
import Sidebar from "../components/Sidebar";
import Repayment from "../components/user/Repayment";

function RepaymentPage() {
  return (
    <div>
      <Navbar />
      <SplitScreen left={<Sidebar />} right={<Repayment />} />
    </div>
  );
}

export default RepaymentPage;
