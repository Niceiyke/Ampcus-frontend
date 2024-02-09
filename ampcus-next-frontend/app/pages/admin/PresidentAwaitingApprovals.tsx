import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import PresidentApprovals from "../../components/admin/PresidentLoanApprovals"
import SplitScreen from "../../layouts/SplitScreen"


function PresidentAwaitingApprovals() {
  return (
    <div className='layout'>
      <Navbar />
      <SplitScreen left={<Sidebar/>} right={<PresidentApprovals/>} />
    </div>
  )
}

export default PresidentAwaitingApprovals