import React, { useState, useEffect } from "react";
import CompaniesList from "../companiesList/CompaniesList";
import Pagination from "../pagination/Pagination";
import Loading from "../loading/Loading";
import styles from "../table/Table.module.scss";

const Table = () => {
  const [companies, setCompanies] = useState([]);
  const [sortedBy, setSortedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage, setCompaniesPerPage] = useState(10);
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

              company.totalIncome = Number(totalIncome.toFixed(2));
              company.averageIncome = Number(averageIncome.toFixed(2));
              company.lastMonthIncome = Number(lastMonthIncome.toFixed(2));
              setCompanies(companies => [...companies, company]);
            });
        });
        // setLoading(false);
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

  const changeCompaniesPerPage = e => {
    setCompaniesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  //ogarnij sortowanie
  const sortAscending = {
    id: (a, b) => (a.id > b.id ? 1 : -1),
    name: (a, b) => (a.name > b.name ? 1 : -1),
    city: (a, b) => (a.city > b.city ? 1 : -1),
    lastMonthIncome: (a, b) => (a.lastMonthIncome > b.lastMonthIncome ? 1 : -1),
    averageIncome: (a, b) => (a.averageIncome > b.averageIncome ? 1 : -1),
    totalIncome: (a, b) => (a.totalIncome > b.totalIncome ? 1 : -1)
  };

  const sortDescending = {
    id: (a, b) => (a.id > b.id ? -1 : 1),
    name: (a, b) => (a.name > b.name ? -1 : 1),
    city: (a, b) => (a.city > b.city ? -1 : 1),
    lastMonthIncome: (a, b) => (a.lastMonthIncome > b.lastMonthIncome ? -1 : 1),
    averageIncome: (a, b) => (a.averageIncome > b.averageIncome ? -1 : 1),
    totalIncome: (a, b) => (a.totalIncome > b.totalIncome ? -1 : 1)
  };

  const handleSort = e => {
    const value = e.target.value;
    if (sortedBy === value) {
      const sorted = [...companies].sort(sortDescending[value]);
      setCompanies(sorted);
      setSortedBy("");
    } else {
      const sorted = [...companies].sort(sortAscending[value]);
      setCompanies(sorted);
      setSortedBy(value);
    }
  };

  return (
    <div className={tableContainer}>
      <div className={tableSearchBar}>
        <select onChange={changeCompaniesPerPage}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          {/* <option value="300">300</option> */}
        </select>
        <div>
          <span>Search:</span> <input type="text" />
        </div>
      </div>
      <ul className={tableNames}>
        <li>
          <button value="id" onClick={handleSort}>
            Id
          </button>
        </li>
        <li>
          <button value="name" onClick={handleSort}>
            Name
          </button>
        </li>
        <li>
          <button value="city" onClick={handleSort}>
            City
          </button>
        </li>
        <li>
          <button value="lastMonthIncome" onClick={handleSort}>
            Last month income
          </button>
        </li>
        <li>
          <button value="averageIncome" onClick={handleSort}>
            Average income
          </button>
        </li>
        <li>
          <button value="totalIncome" onClick={handleSort}>
            Total income
          </button>
        </li>
      </ul>
      {companies.length === 300 ? (
        <CompaniesList
          companies={currentCompanies}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <Loading />
      )}

      {companies.length === 300 ? (
        <Pagination
          companiesPerPage={companiesPerPage}
          totalCompanies={companies.length}
          paginate={paginate}
        />
      ) : null}
    </div>
  );
};

export default Table;
