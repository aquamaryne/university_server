import React, { useEffect } from "react";
import { ReactToPrint } from "react-to-print";
import "../../css/table.css";
import axios from "axios";
import { TableHead, TableBody, TableRow, TableCell, Table } from "@mui/material";

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
              size: 100;
              margin: 2rem; 
              orientation: landscape;
            }
            
            @media print {
              .print-title {
                width: 100%;
                margin-bottom: 1rem; 
                font-size: 24px; 
                text-align: center;
              }
            
              .print-table {
                width: 100%;
                font-size: 16px; 
                text-align: center; /* Выравнивание по центру */
              }
            
              body, html, #root, .print-content, .print-button {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
              }
            }

        `}
      />
      <div ref={componentRef} className="print-content">
        <h1 className="print-title">Штаний формуляр</h1>
        <>
          <Table className="print-table">
              <TableHead>
                  <TableRow>
                    <TableCell>Код</TableCell>
                    <TableCell>Ім'я, Прізвище та По батькові</TableCell>
                    <TableCell>Посада</TableCell>
                    <TableCell>Дата призначення на посаду</TableCell>
                    <TableCell>Дисципліна, яку викладає</TableCell>
                    <TableCell>Штат або виклик</TableCell>
                    <TableCell>Наукове звання</TableCell>
                    <TableCell>Науковий ступінь</TableCell>
                    <TableCell>Стаж наукової роботи (Загальний)</TableCell>
                    <TableCell>Стаж наукової роботи (У цьому ВНЗ)</TableCell>
                    <TableCell>Рік останньої підвищеної кваліфікації</TableCell>
                    <TableCell>Рік народження</TableCell>
                    <TableCell>Стать</TableCell>
                    <TableCell>Освіта</TableCell>
                    <TableCell>Вченне Звання</TableCell>
                    <TableCell>Звідки прибув</TableCell>
                    <TableCell>Дата закінчення роботи</TableCell>
                  </TableRow>
                  <TableRow>
                      {[...Array(17).keys()].map((index) => (
                          <th key={index} style={{ textAlign: 'center' }}>{index + 1}</th>
                      ))}
                  </TableRow>
              </TableHead>
            <TableBody>
            {employeers.map((employyer) => (
                <TableRow key={employyer.id}>
                    <TableCell>{employyer.id}</TableCell>
                    <TableCell>
                        {employyer.fname}
                        {employyer.sname}
                        {employyer.fatherly}
                    </TableCell>
                    <TableCell>{employyer.date_of_birth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </div>
    </div>
  );
};

export default FullFormPrint;
