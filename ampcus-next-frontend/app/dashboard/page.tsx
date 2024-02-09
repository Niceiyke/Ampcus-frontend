import Navbar from "../components/Navbar";
import SplitScreen from "../layouts/SplitScreen";
import Sidebar from "../components/Sidebar";
import ScrollingText from "../components/ScrolingText";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
  return (
    <div className="layout">
      <Navbar />

      <SplitScreen left={<Sidebar />} right={<Dashboard />} />
    </div>
  );
}

export default DashboardPage;
