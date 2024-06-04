import { useState } from "react";

const DateComponent = () => {
  const todate = new Date();
  const [year, setYear] = useState(todate.getFullYear());
  const [month, setMonth] = useState(todate.getMonth());

  let dateFormat = (year, month) => {
    return `${year}.${month < 10 ? `0${month}` : month}`;
  };

  const pervMonth = () => {
    setMonth((perv) => (perv === 1 ? 12 : perv - 1));
    if (month === 1) {
      setYear((perv) => perv - 1);
    }
  };
  const nextMonth = () => {
    setMonth((next) => (next === 12 ? 1 : next + 1));
    if (month === 12) {
      setYear((next) => next + 1);
    }
  };
  return (
    <div className="day flex">
      <img src="./left-arrow.png" alt="prevMonth" onClick={pervMonth} />
      <span>{dateFormat(year, month)}</span>
      <img src="./right-arrow.png" alt="nextMonth" onClick={nextMonth} />
    </div>
  );
};

export default DateComponent;
