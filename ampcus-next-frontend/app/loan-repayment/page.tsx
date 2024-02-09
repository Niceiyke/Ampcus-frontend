import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Repayment from "../components/user/Repayment";
import SplitScreen from "../layouts/SplitScreen";




function LoanRequestPage() {
  return (
    <div>
      <Navbar />
      <SplitScreen left={<Sidebar />} right={<Repayment />} />
    </div>
  );
}

export default LoanRequestPage;