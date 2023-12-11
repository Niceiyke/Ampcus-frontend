import React from "react";
import Navbar from "../components/Navbar";
import SplitScreen from "../layouts/SplitScreen";
import Sidebar from "../components/Sidebar";
import LoanDetail from "../components/LoanDetail";



function LoanDetailPage() {
  return (
    <div>
      <Navbar />
      <SplitScreen left={<Sidebar/>} right={<LoanDetail/>} />
    </div>
  );
}

export default LoanDetailPage;
