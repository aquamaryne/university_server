import React from "react";
import { ReactToPrint } from "react-to-print";
import "../../css/table.css";
import { textAlign } from "@mui/system";

const FullFormPrint = () => {
  const componentRef = React.useRef();

  const firedPeople = [
    {
      id: 1,
      fullName: "Иванов Иван Иванович",
      position: "Программист",
      dateStarted: "01.01.2023",
      discipline: "Информатика",
      employmentType: "Штат",
      academicTitle: "Профессор",
      academicDegree: "Доктор наук",
      totalExperience: "10 лет",
      universityExperience: "5 лет",
      lastQualificationYear: "2022",
      birthYear: "1990",
      gender: "Мужской",
      education: "Высшее",
      rank: "Капитан",
      origin: "Университет",
      employmentEndDate: "01.01.2024"
    },
    {
      id: 2,
      fullName: "Петров Петр Петрович",
      position: "Аналитик",
      dateStarted: "01.02.2022",
      discipline: "Математика",
      employmentType: "Вспомогательный",
      academicTitle: "Доцент",
      academicDegree: "Кандидат наук",
      totalExperience: "8 лет",
      universityExperience: "3 лет",
      lastQualificationYear: "2021",
      birthYear: "1985",
      gender: "Мужской",
      education: "Высшее",
      rank: "Майор",
      origin: "Колледж",
      employmentEndDate: "01.02.2023"
    },
    // Добавьте данные для других сотрудников здесь
    {
      id: 3,
      fullName: "Сидорова Елена Ивановна",
      position: "Бухгалтер",
      dateStarted: "01.03.2021",
      discipline: "Финансы",
      employmentType: "Штат",
      academicTitle: "Ассистент",
      academicDegree: "Бакалавр",
      totalExperience: "5 лет",
      universityExperience: "2 лет",
      lastQualificationYear: "2020",
      birthYear: "1992",
      gender: "Женский",
      education: "Высшее",
      rank: "Прапорщик",
      origin: "Университет",
      employmentEndDate: "01.03.2022"
    },
    {
      id: 4,
      fullName: "Кузнецов Владимир Сергеевич",
      position: "Инженер",
      dateStarted: "01.04.2020",
      discipline: "Техника",
      employmentType: "Штат",
      academicTitle: "Преподаватель",
      academicDegree: "Кандидат наук",
      totalExperience: "12 лет",
      universityExperience: "6 лет",
      lastQualificationYear: "2019",
      birthYear: "1980",
      gender: "Мужской",
      education: "Высшее",
      rank: "Капитан-Лейтенант",
      origin: "Университет",
      employmentEndDate: "01.04.2021"
    },
    {
      id: 5,
      fullName: "Смирнова Ольга Николаевна",
      position: "Менеджер",
      dateStarted: "01.05.2019",
      discipline: "Менеджмент",
      employmentType: "Штат",
      academicTitle: "Старший преподаватель",
      academicDegree: "Кандидат наук",
      totalExperience: "9 лет",
      universityExperience: "4 лет",
      lastQualificationYear: "2018",
      birthYear: "1987",
      gender: "Женский",
      education: "Высшее",
      rank: "Капитан-Майор",
      origin: "Университет",
      employmentEndDate: "01.05.2020"
    },
    {
      id: 6,
      fullName: "Иванова Мария Владимировна",
      position: "Преподаватель",
      dateStarted: "01.06.2018",
      discipline: "Педагогика",
      employmentType: "Штат",
      academicTitle: "Профессор",
      academicDegree: "Доктор наук",
      totalExperience: "15 лет",
      universityExperience: "8 лет",
      lastQualificationYear: "2017",
      birthYear: "1975",
      gender: "Женский",
      education: "Высшее",
      rank: "Подполковник",
      origin: "Университет",
      employmentEndDate: "01.06.2019"
    },
    {
      id: 7,
      fullName: "Сидоров Игорь Павлович",
      position: "Директор",
      dateStarted: "01.07.2017",
      discipline: "Управление",
      employmentType: "Штат",
      academicTitle: "Профессор",
      academicDegree: "Доктор наук",
      totalExperience: "20 лет",
      universityExperience: "10 лет",
      lastQualificationYear: "2016",
      birthYear: "1970",
      gender: "Мужской",
      education: "Высшее",
      rank: "Полковник",
      origin: "Университет",
      employmentEndDate: "01.07.2018"
    }
  ];
  
  
  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="print-button">Print</button>}
        content={() => componentRef.current}
        pageStyle={`
            @page {
                size: 450mm 360mm;
                margin: 2rem; 
                orientation: landscape;
            }
            @media print {
                .print-title {
                    font-size: 140px;
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .print-table {
                    margin-top: 0;
                    width: 100%;
                    font-size: 40px;
                    text-align: center;
                }
            }
        `}
      />
      <div ref={componentRef} className="print-content">
        <h1 className="print-title">Штаний формуляр</h1>
        <table className="print-table">
            <thead>
                <tr>
                    <th>КОД</th>
                    <th>Имя, Фамилия и Отчество</th>
                    <th>Поасад</th>
                    <th>Дата вступу на посаду</th>
                    <th>Дисциплину которую читает</th>
                    <th>Штат или вспом</th>
                    <th>Науч звание</th>
                    <th>Науч степень</th>
                    <th>Стаж науч работы (Общий)</th>
                    <th>Стаж науч работы (В этом ВНЗ)</th>
                    <th>Год последней пов квал</th>
                    <th>Год рождения</th>
                    <th>Пол</th>
                    <th>Образование</th>
                    <th>Звание</th>
                    <th>Откуда пришел</th>
                    <th>Дата окончание труд</th>
                </tr>
                <tr>
                    {[...Array(17).keys()].map((index) => (
                        <th key={index} style={{ textAlign: 'center' }}>{index + 1}</th>
                    ))}
                </tr>
            </thead>
          <tbody>
          {firedPeople.map((person) => (
            <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.fullName}</td>
                <td>{person.position}</td>
                <td>{person.dateStarted}</td>
                <td>{person.discipline}</td>
                <td>{person.employmentType}</td>
                <td>{person.academicTitle}</td>
                <td>{person.academicDegree}</td>
                <td>{person.totalExperience}</td>
                <td>{person.universityExperience}</td>
                <td>{person.lastQualificationYear}</td>
                <td>{person.birthYear}</td>
                <td>{person.gender}</td>
                <td>{person.education}</td>
                <td>{person.rank}</td>
                <td>{person.origin}</td>
                <td>{person.employmentEndDate}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullFormPrint;
