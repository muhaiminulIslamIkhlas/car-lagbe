import { Button, Empty } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRides } from "../services/customer.service";
import { getBadge, getStatusByCode } from "../utils/user";

const AllRide = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await getAllRides();
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [customerId]);

  if (!data) return <Empty style={{margin: 20}} />;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="display-4 mb-4">All Rides</h1>
      {data.length ? (
        <table className="table table-responsive ">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              console.log(item);
              return (
                <tr key={index}>
                  <td>{item.starting_point}</td>
                  <td>{item.destination}</td>
                  <td>{moment(item.journey_date).format("MMM Do YY")}</td>
                  <td>
                    <span className={getBadge(item.status)}>
                      {getStatusByCode(item.status)}
                    </span>
                  </td>
                  <td>
                    {item.status === 1 && (
                      <Button
                        type="primary"
                        onClick={() => {
                          navigate("/ride-bids/" + item.id);
                        }}
                      >
                        Select a driver
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default AllRide;
