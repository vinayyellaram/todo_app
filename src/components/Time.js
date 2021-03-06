import React from "react";

import "react-datepicker/dist/react-datepicker.css";
const Time = ({ setSelectedDate, setSelectedTime }) => {
  return (
    <div>
      <h3>Due Date</h3>
      {/* <input
        type="date"
        required
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={(e) => setSelectedDate(e.target.value)}
      /> */}
      <input
        type="datetime-local"
        step={1000}
        required
        onChange={(e) => {
          setSelectedTime(e.target.value);
          console.log(e.target.value);
        }}
        placeholder={"date"}
      />
    </div>
  );
};

export default Time;
