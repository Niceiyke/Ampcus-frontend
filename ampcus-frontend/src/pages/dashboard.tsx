import Navbar from "../components/Navbar";
import SplitScreen from "../layouts/SplitScreen";
import Sidebar from "../components/Sidebar";
import FetchMembers from "../components/user/Member";
import ScrollingText from "../components/ScrolingText";

function Dashboard() {
  return (
    <div className="layout">
      <Navbar />
      <ScrollingText />
      <SplitScreen left={<Sidebar />} right={<FetchMembers />} />
    </div>
  );
}

export default Dashboard;
