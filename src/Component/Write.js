import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../Conponent_css/Calendar.css";
import "react-calendar/dist/Calendar.css";
import DateComponent from "./DateComponent.js";
import IncomeTable from "./IncomeTable.js";

const WriteExpens = () => {
  const [cardKind, setCardKind] = useState("삼성카드");
  const [cashTotal, setCashTotal] = useState(0); //현금합계
  const [cardTotal, setCardTotal] = useState(0); //카드합계
  const [spandingTotal, setSpandingTotal] = useState(0); //지출합계:현금+카드
  const [rows, setRows] = useState([]); //행목록

  useEffect(() => {
    const savedData = localStorage.getItem("spendingData");
    if (savedData) {
      setRows(JSON.parse(savedData));
    }
    const saveCahsTotal = localStorage.getItem("cashTotal");
    if (saveCahsTotal) {
      setCardTotal(parseFloat(saveCahsTotal));
    }
    const saveCardTotal = localStorage.getItem("cardTotal");
    if (saveCardTotal) {
      setCardTotal(parseFloat(saveCardTotal));
    }
    const saveAllTatal = localStorage.getItem("spandingTotal");
    if (saveAllTatal) {
      setSpandingTotal(parseFloat(saveAllTatal));
    }
  }, []);
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length,
        date: "",
        description: "",
        cash: 0,
        card: 0,
        cardKind: cardKind,
        category: "",
        checked: false,
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCheckboxChang = (index) => {
    const newRows = [...rows];
    newRows[index].checked = !newRows[index].checked;
    setRows(newRows);
  };

  const saveData = () => {
    const totalCash = rows.reduce(
      (sum, row) => sum + parseFloat(row.cash || 0),
      0
    );
    setCashTotal(totalCash);
    localStorage.setItem("spendingData", JSON.stringify(rows));
    localStorage.setItem("cashTotal", totalCash);

    const totalCard = rows.reduce(
      (sum, row) => sum + parseFloat(row.card || 0),
      0
    );
    setCardTotal(totalCard);
    localStorage.setItem("spendingData", JSON.stringify(rows));
    localStorage.setItem("cardTotal", totalCard);
    alert("Data saved successfully!");
  };

  const onClickDelete = () => {
    const newRows = rows.filter((row) => !row.checked);
    setRows(newRows);
    localStorage.setItem("spendingData", JSON.stringify(newRows));
    const totalCash = newRows.reduce(
      (sum, row) => sum + parseFloat(row.cash || 0),
      0
    );
    setCashTotal(totalCash);
    localStorage.setItem("cashTotal", totalCash);
    const totalCard = newRows.reduce(
      (sum, row) => sum + parseFloat(row.card || 0),
      0
    );
    setCardTotal(totalCard);
    localStorage.setItem("cardTotal", totalCard);
  };

  return (
    <div className="MainW flex">
      <div className="spending flex">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>날짜</th>
              <th>사용내역</th>
              <th>현금</th>
              <th>카드</th>
              <th>카드분류</th>
              <th>분류</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr className="tableChange" key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={row.checked}
                    onChange={() => handleCheckboxChang(index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) =>
                      handleChange(index, "date", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className="cash"
                    type="number"
                    value={row.cash}
                    onChange={(e) => {
                      handleChange(index, "cash", e.target.value);
                      setCashTotal(row.cash);
                    }}
                  />
                  원
                </td>
                <td>
                  <input
                    className="card"
                    type="number"
                    value={row.card}
                    onChange={(e) =>
                      handleChange(index, "card", e.target.value)
                    }
                  />
                  원
                </td>
                <td>
                  <select
                    value={row.cardKind}
                    onChange={(e) =>
                      handleChange(index, "cardKind", e.target.value)
                    }
                  >
                    <option>{cardKind}</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={row.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className="saveBox flex">
          <div className="btnBox  flex ">
            <button className="delete" onClick={onClickDelete}>
              선택삭제
            </button>
            <button className="copy" onClick={addRow}>
              추가하기
            </button>
            <button className="copy">고정금액</button>
          </div>
          <div className="cashTotal flex flexAll">
            <p>현금합계</p>
            <span>{cashTotal}</span>
          </div>
          <div className="cardTotal flex flexAll">
            <p>카드합계</p>
            <span>{cardTotal}</span>
          </div>
          <div className="spandingTotal flex">
            <div className="textBox flex flexAll">
              <p>지출(현금+카드)합계</p>
              <span>{spandingTotal}</span>
            </div>
            <button onClick={saveData}>저장하기</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

const WriteMenu = () => {
  const [clickboder, setClickboder] = useState(true);

  const [menuList, setMenuList] = useState(["지출", "수입", "달력"]);
  const [menuaction, setMenuaction] = useState("지출");
  const borderBottom = () => {
    setClickboder(!clickboder);
  };

  const handlMenuClick = (list) => {
    setMenuaction(list);
  };
  return (
    <div className="MainW flex">
      <DateComponent />
      <div className="writeMenu flex">
        {menuList.map((list) => (
          <span
            key={list}
            onClick={() => handlMenuClick(list)}
            className={menuaction === list ? "borderBottom" : ""}
          >
            {list}
          </span>
        ))}
      </div>
      {menuaction === "지출" && <WriteExpens />}
      {menuaction === "수입" && <WriteIncome />}
      {menuaction === "달력" && <Calendar />}
    </div>
  );
};

const WriteIncome = (props) => {


  
  return (
    <div className="MainW flex">
     <IncomeTable rows={props.rows}/>
    </div>
  );
};

export { WriteExpens,  WriteMenu,  WriteIncome };
