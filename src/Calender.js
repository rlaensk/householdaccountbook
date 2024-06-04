import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./Conponent_css/Calender.css";

const CalendarBox = () => {
    const [value, sestValue] = useState(new Date());
  return <>
    <Calendar onChange={hadleDateChange} value={vlae}></Calendar>
  </>;
};

export default CalendarBox;
