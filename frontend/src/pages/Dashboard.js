import DashContent from "../components/DashContent";
import SideMenu from "../components/SideMenu";

const Dashboard = () => {
  return (
    <div className="main">
      <SideMenu />
      <DashContent />
    </div>
  );
};

export default Dashboard;
