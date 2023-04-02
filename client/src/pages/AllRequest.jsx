import { Empty, Pagination } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRequest } from "../services/bids.service";

const AllRequest = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    pageNumber: 1,
    total: 0,
    current: 1,
  });

  const fetchData = async (pageNumber = 1, driverId = "") => {
    const { result } = await getAllRequest(pageNumber, driverId);
    setData(result.data);
    setPaginationInfo({
      current: result.current_page,
      total: result.total,
      pageNumber: pageNumber,
    });
    console.log(result);
  };

  useEffect(() => {
    fetchData();
  }, [paginationInfo.pageNumber]);

  const handlePagination = async (page) => {
    await fetchData(page);
  };

  return (
    <div className="container mt-4 mb-4">
      <h1 className="display-4 mb-4">All Request</h1>
      {data.length ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.starting_point}</td>
                <td>{item.destination}</td>
                <td>{moment(item.journey_date).format("MMM Do YY")}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/ride-bids/" + item.id)}
                  >
                    Start bid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Empty />
      )}

      <div className="mt-4">
        <Pagination
          defaultCurrent={1}
          total={paginationInfo.total}
          current={paginationInfo.current}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default AllRequest;
