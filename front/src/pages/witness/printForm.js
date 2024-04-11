import React, { useEffect } from "react";
import { ReactToPrint } from "react-to-print";
import "../../css/table.css";
import axios from "axios";

const FullFormPrint = () => {
  const componentRef = React.useRef();

  const[employeers, setEmployeers] = React.useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/employeers`)
    .then(res => setEmployeers(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="print-button">Print</button>}
        content={() => componentRef.current}
        pageStyle={`
            @page {
              size: auto;
              margin: 2rem; 
              orientation: landscape;
              }
              @media print {
                  .print-title {
                      width: 100%;
                      margin-bottom: 5rem;
                  }
          
                  .print-table {
                      width: 110%;
                      height: 90%;
                      font-size: 140px;
                      text-align: center;
                  }
          
                  body, html, #root, .print-content, .print-button {
                      margin: 0;
                      padding: 0;
                      width: 100%;
                      height: 100%; /* Установка высоты на 100% */
                  }
              }
        `}
      />
      <div ref={componentRef} className="print-content">
        <h1 className="print-title">Штаний формуляр</h1>
        <table className="print-table">
            <thead>
                <tr>
                  <th>Код</th>
                  <th>Ім'я, Прізвище та По батькові</th>
                  <th>Посада</th>
                  <th>Дата призначення на посаду</th>
                  <th>Дисципліна, яку викладає</th>
                  <th>Штат або виклик</th>
                  <th>Наукове звання</th>
                  <th>Науковий ступінь</th>
                  <th>Стаж наукової роботи (Загальний)</th>
                  <th>Стаж наукової роботи (У цьому ВНЗ)</th>
                  <th>Рік останньої підвищеної кваліфікації</th>
                  <th>Рік народження</th>
                  <th>Стать</th>
                  <th>Освіта</th>
                  <th>Вченне Звання</th>
                  <th>Звідки прибув</th>
                  <th>Дата закінчення роботи</th>
                </tr>
                <tr>
                    {[...Array(17).keys()].map((index) => (
                        <th key={index} style={{ textAlign: 'center' }}>{index + 1}</th>
                    ))}
                </tr>
            </thead>
          <tbody>
          {employeers.map((employyer) => (
              <tr key={employyer.id}>
                  <td>{employyer.id}</td>
                  <td>
                      {employyer.fname}
                      {employyer.sname}
                      {employyer.fatherly}
                  </td>
                  <td>{employyer.date_of_birth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullFormPrint;
