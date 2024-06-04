import { useState, useEffect } from "react";
import { WriteExpens,  WriteMenu } from '../Component/Write.js';
import BudgetP from "./BudgetPage";

const Nav = () => {
  const [totalMoney, setTotalMoeny] = useState(0); //수입 = 지출
  const [income, setIncome] = useState(0); //수입
  const [expenditure, setExpenditure] = useState(0); // 지출
  const [totalasset, setTotalasset] = useState(0); // 총 누적자산

  const [thisarrow, setThisArrow] = useState(false); //이달가계
  const [totalarrow, setTotalarrow] = useState(false);
  const [write, setwrite] = useState(true);
  const [BudgetPage, setBudgetPage] = useState(false);

  const onClickArrow = () => {
    setThisArrow(!thisarrow);
  }; // 이달가계
  const onClickTotalarrow = () => {
    setTotalarrow(!totalarrow);
  };

  const onClickWrite = () => {
    setwrite(!write);
    setBudgetPage(false);
  };

  const onClickBudget = () => {
    setBudgetPage(!BudgetPage);
    setwrite(false);
  };

  return (
    <div className="flex">
      <nav>
        <div className="NavBox">
          <div className="flex">
            <button onClick={onClickWrite}>쓰기</button>
            <button className="flexBox" type="button">
              고정금액 관리
            </button>
          </div>
          <div className="flex">
            <button onClick={onClickBudget}>예산쓰기</button>
          </div>
          <div className="thisMonthBox flex">
            <div className="calendarBox flex">
              <button className="arrow" onClick={onClickArrow}>
                {thisarrow === false ? (
                  <img src="/arrow-up.png" alt="arrow-up" />
                ) : (
                  <img src="/arrow-down.png" alt="arrow-down" />
                )}
                이달 가계
              </button>
              <span className="calendaBoxr"></span>
            </div>
            <div className="thisMonth flex">
              <div className="Month1 flex fontMoney">
                = 수입 - 지출
                <span className="Income-expenditure">{totalMoney}</span>
              </div>
              <div className="Month2 flex">
                <p className="flex">
                  + 수입 <span className="income">{income}</span>
                </p>
                <p className="flex">
                  - 지출 <span className="expenditure">{expenditure}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="totalBox flex">
            <button className="arrow" onClick={onClickTotalarrow}>
              {totalarrow === false ? (
                <img src="/arrow-up.png" alt="arrow-up" />
              ) : (
                <img src="/arrow-down.png" alt="arrow-down" />
              )}
              총 누적 자산
            </button>
            <p className="fontMoney flex">
              = 자산 합계 <span className="totalasset">{totalasset}</span>
            </p>
          </div>
        </div>
      </nav>
      {write && < WriteMenu />}
      {BudgetPage && <BudgetP />}
    </div>
  );
};

export { Nav, WriteExpens };
