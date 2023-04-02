import { Empty } from "antd";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/admin/dashboard.service";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await getDashboardData();
    setData(response.result);
    console.log(response);
  };

  //   fetchData()

  useEffect(() => {
    console.log("Hello");
    fetchData();
  }, []);

  if (!data) {
    return <Empty />;
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">
          <i className="anticon anticon-ant-design"></i>
        </div>
        <div className="card-title">Summary</div>
      </div>
      <div className="card-body">
        <div className="metric">
          <div className="metric-value">{data.driverNumber ?? 0}</div>
          <div className="metric-title">Number of Drivers</div>
        </div>
        <div className="metric">
          <div className="metric-value">{data.pendingDriverNumber ?? 0}</div>
          <div className="metric-title">Driver Request Pending for review</div>
        </div>
        <div className="metric">
          <div className="metric-value">50,000</div>
          <div className="metric-title">Pageviews</div>
        </div>
        <div className="metric">
          <div className="metric-value">{data.driverNumber ?? 0}</div>
          <div className="metric-title">Number of Drivers</div>
        </div>
        <div className="metric">
          <div className="metric-value">{data.pendingDriverNumber ?? 0}</div>
          <div className="metric-title">Driver Request Pending for review</div>
        </div>
        <div className="metric">
          <div className="metric-value">50,000</div>
          <div className="metric-title">Pageviews</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
