import React, { useState, useEffect } from "react";
import CompaniesList from "../companiesList/CompaniesList";
import Pagination from "../pagination/Pagination";
import styles from "../table/Table.module.scss";

const Table = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);
  // const [ascending, setAscending] = useState(false);

  const { tableContainer, tableSearchBar, tableNames } = styles;

  useEffect(() => {
    const fetchCompanies = async () => {
      const addIncomes = fetchedCompanies => {
        fetchedCompanies.forEach(company => {
          let totalIncome = 0;
          let averageIncome = 0;
          let lastMonthIncome = 0;

          fetch(`https://recruitment.hal.skygate.io/incomes/${company.id}`)
            .then(res => res.json())
            .then(json => {
              const incomes = json.incomes;
              let lastMonth = [0];
              let lastMonthIncomeNumbers = [];

              incomes.forEach(income => {
                let currentMonth = Number(income.date.slice(5, 7));
                if (currentMonth > lastMonth[Number(lastMonth.length - 1)]) {
                  lastMonth = [];
                  lastMonthIncomeNumbers = [];
                  lastMonth.push(currentMonth);
                  lastMonthIncomeNumbers.push(Number(income.value));
                } else if (
                  currentMonth === lastMonth[Number(lastMonth.length - 1)]
                ) {
                  lastMonth.push(currentMonth);
                  lastMonthIncomeNumbers.push(Number(income.value));
                }

                totalIncome = totalIncome + Number(income.value);
                lastMonthIncome = lastMonthIncomeNumbers.reduce(
                  (prevIncome, currentIncome) => {
                    return prevIncome + currentIncome;
                  }
                );
              });
              averageIncome = totalIncome / 12;
              // na pewno to number???????
              company.totalIncome = Number(totalIncome.toFixed(2));
              company.averageIncome = Number(averageIncome.toFixed(2));
              company.lastMonthIncome = Number(lastMonthIncome.toFixed(2));
              setCompanies(companies => [...companies, company]);
            });
        });
        setLoading(false);
      };

      setLoading(true);
      fetch("https://recruitment.hal.skygate.io/companies")
        .then(res => res.json())
        .then(json => addIncomes(json));
    };

    fetchCompanies();
  }, []);

  // PAGINATION
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  //ogarnij sortowanie
  // const sort = {
  //   id: (a, b) => (a.id > b.id ? 1 : -1),
  //   name: (a, b) => (a.name > b.name ? -1 : -1),
  //   city: (a, b) => (a.city > b.city ? 1 : -1),
  //   lastMonth: (a, b) => (a.lastMonth > b.lastMonth ? -1 : -1),
  //   averageIncome: (a, b) => (a.averageIncome > b.averageIncome ? -1 : -1),
  // totalIncome: (a, b) => (a.totalIncome > b.totalIncome ? -1 : 1)
  // };

  // const handleSort = e => {
  // const { value } = e.target;

  // console.log(value);
  //   setCompanies(companies.sort(sort[value]));
  //   console.log(companies);
  // };

  return (
    <div className={tableContainer}>
      <div className={tableSearchBar}>
        <span>Search:</span> <input type="text" />
      </div>
      <ul className={tableNames}>
        <li>
          <button
            value="id"
            //  onClick={handleSort}
          >
            Id
          </button>
        </li>
        <li>
          <button
            value="name"
            //  onClick={handleSort}
          >
            Name
          </button>
        </li>
        <li>
          <button
            value="city"
            //  onClick={handleSort}
          >
            City
          </button>
        </li>
        <li>
          <button
            value="lastMonth"
            // onClick={handleSort}
          >
            Last month income
          </button>
        </li>
        <li>
          <button
            value="averageIncome"
            // onClick={handleSort}
          >
            Average income
          </button>
        </li>
        <li>
          <button
            value="totalIncome"
            // onClick={handleSort}
          >
            Total income
          </button>
        </li>
      </ul>
      <CompaniesList companies={currentCompanies} loading={loading} />
      <Pagination
        companiesPerPage={companiesPerPage}
        totalCompanies={companies.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Table;
