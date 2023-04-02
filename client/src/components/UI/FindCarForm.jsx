import React, { useState } from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { journeyRequest } from "../../services/customer.service";
import moment from "moment";

const FindCarForm = () => {
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formObject = {
      starting_point: startingPoint,
      destination: destination,
      journey_date: moment(date).format("YYYY/MM/DD"),
      comments: comment,
    };

    const response = await journeyRequest(formObject);
    if (!response.hasError) {
      console.log("success");
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input
            type="text"
            placeholder="From address"
            onChange={(e) => {
              setStartingPoint(e.target.value);
            }}
            name="starting_point"
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="text"
            placeholder="To address"
            name="destination"
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="date"
            placeholder="Journey date"
            name="journey_date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            min={moment(new Date()).format("YYYY-MM-DD")}
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            name="comments"
            placeholder="Comment"
            maxLength="150"
            wrap="hard"
          ></textarea>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Send Request</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
