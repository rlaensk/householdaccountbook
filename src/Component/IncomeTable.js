import { useState , useEffect} from "react";
const IncomeTable = (props) => {
    const [rows, setRows] = useState([]); //행목록
    const [cashTotal, setCashTotal] = useState(0); //현금합계
    const [bankAccount, setBankAccount] = useState(["하나은행"]);
    const [incometotal, setIncomeTotal] = useState(0);
   
    useEffect(() => {
        const savedData = localStorage.getItem("incomeData");
        if (savedData) {
          setRows(JSON.parse(savedData));
        }
        const saveCashTotal = localStorage.getItem("incomeCashTotal");
        if (saveCashTotal) {
          setCashTotal(parseFloat(saveCashTotal));
        }
      }, []);
    
    const addRow = () => {
        setRows([
          ...rows,
          {
            id: rows.length,
            date: "",
            depositdetails: "",
            cash: 0,
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
        setIncomeTotal(totalCash);
        localStorage.setItem("spendingData", JSON.stringify(rows));
        localStorage.setItem("cashTotal", totalCash);
    
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
      };
    return(
        <>
         <div className="spending flex">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th className="incomeDateTh">날짜</th>
              <th>입금내역</th>
              <th>현금</th>
              <th>입금통장</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr className="tableChange" key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={rows.checked}
                    onChange={() => handleCheckboxChang(index)}
                  />
                </td>
                <td>
                  <input
                    className="incomeDate"
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
                  <select>
                    <option>{bankAccount}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className="saveBox flex">
          <div className="btnBox flex incomBtnBox">
            <button className="delete" onClick={onClickDelete}>
              선택삭제
            </button>
            <button className="copy" onClick={addRow}>
              추가하기
            </button>
            <button className="copy">고정금액</button>
          </div>
          <div className="cashTotal flex flexAll incomCashTotal">
            <p>수입합계</p>
            <span>{cashTotal}</span>
          </div>

          <div className="spandingTotal flex incomeSave">
            <button onClick={saveData}>저장하기</button>
          </div>
        </footer>
      </div></>
    )
}
export default IncomeTable