import { Button, Empty, Input, notification, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBid, getBidByJourney, getRideById } from "../services/bids.service";
import { getUserInfo } from "../utils/user";

const Bids = () => {
  const admin = 1;
  const customer = 2;
  const driver = 3;
  const [journeyData, setJourneyData] = useState({});
  const [bid, setBid] = useState("");
  const [allBid, setAllBid] = useState([]);
  let { journeyId } = useParams();
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const fetchJourneyData = async () => {
    const response = await getRideById(journeyId);
    setJourneyData(response.data);
  };

  const fetchBidData = async () => {
    const response = await getBidByJourney(journeyId);
    setAllBid(response.data);
    console.log(response);
  };

  // const fetchDriverBids = async () => {

  // }

  useEffect(() => {
    fetchJourneyData();
  }, [journeyId]);

  // useEffect(() => {
  //   fetchBidData();
  // }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBidData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBidAdd = async () => {
    const response = await addBid({
      user_id: userInfo.id,
      journey_request_id: journeyId,
      bid_price: bid,
    });

    if (response) {
      notification.success({
        message: "Bid added successfully",
        description: "You have added bid successfully",
      });
      setBid("");
    }
  };

  if (!journeyId || !journeyData) {
    return <Empty />;
  }

  return (
    <div className="container pt-4 pb-4">
      <div className="mb-2">
        <span className="badge bg-danger">
          {moment(new Date(journeyData.journey_date)).format("MMM Do YY")}
        </span>
      </div>
      <table className="table table-bordered table-responsive mb-2">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{journeyData.starting_point}</td>
            <td>{journeyData.destination}</td>
          </tr>
        </tbody>
      </table>
      {journeyData.comments && (
        <div className="alert alert-primary mb-2">{journeyData.comments}</div>
      )}
      {userInfo.role === driver && (
        <>
          <span className="badge bg-info mb-2">Share your amount</span>
          <div className="d-flex">
            <Input
              type="number"
              style={{ width: "250px", marginRight: "10px" }}
              onChange={(e) => setBid(e.target.value)}
              value={bid}
            />
            <Button onClick={handleBidAdd}>Bid</Button>
          </div>
        </>
      )}

      {allBid && (
        <div className="mt-4 card p-2 ">
          {!allBid.length && <Spin />}
          {allBid.map((item, index) => (
            <div
              class={`alert alert-${
                index % 2 === 0 ? "primary" : "secondary"
              } d-flex justify-content-between`}
              role="alert"
            >
              {item.bid_price}
              <div>
                <button className="btn btn-primary" style={{ marginRight: 2 }}>
                  Car detail
                </button>
                <button className="btn btn-success">Confirm</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bids;
