import React, { useState, useEffect } from "react";
import CompaniesList from "../companiesList/CompaniesList";
import Pagination from "../pagination/Pagination";
import Loading from "../loading/Loading";
import ErrorInfo from "../errorInfo/ErrorInfo";
import styles from "../table/Table.module.scss";

const Table = () => {
  const [companies, setCompanies] = useState([]);
  const [display, setDisplay] = useState([]);
  const [sortedBy, setSortedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredLength, setFilteredLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage, setCompaniesPerPage] = useState(10);
  const [fetchFailed, setFetchFailed] = useState(false);

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
              setDisplay(companies => [...companies, company]);
            })
            .catch(error => {
              console.error("Error:", error);
              setFetchFailed(true);
            });
        });
      };

      setLoading(true);
      fetch("https://recruitment.hal.skygate.io/companies")
        .then(res => res.json())
        .then(json => addIncomes(json))
        .catch(error => {
          console.error("Error:", error);
          setFetchFailed(true);
        });
    };

    fetchCompanies();
  }, []);

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = display.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const changeCompaniesPerPage = e => {
    setCompaniesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

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
      const sorted = [...display].sort(sortDescending[value]);
      setDisplay(sorted);
      setSortedBy("");
    } else {
      const sorted = [...display].sort(sortAscending[value]);
      setDisplay(sorted);
      setSortedBy(value);
    }
  };

  const handleFilter = e => {
    setCurrentPage(1);
    const { value } = e.target;
    let filterResult = [];
    companies.forEach(company => {
      let filteredValue = null;
      for (let i = 0; i < 6; i++) {
        const filterFields = {
          0: "id",
          1: "name",
          2: "city",
          3: "averageIncome",
          4: "lastMonthIncome",
          5: "totalIncome"
        };
        filteredValue =
          company[filterFields[i]]
            .toString()
            .toLowerCase()
            .search(value.toLowerCase()) !== -1;
        if (filteredValue) {
          const isInFilteredResult = filterResult.find(result => {
            return result.id === company.id;
          });
          if (!isInFilteredResult) {
            filterResult.push(company);
            setFilteredLength(filterResult.length);
          }
        }
      }
      setDisplay(filterResult);
    });
  };

  return (
    <div className={tableContainer}>
      <div className={tableSearchBar}>
        <select onChange={changeCompaniesPerPage}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div>
          <span>Search:</span> <input onChange={handleFilter} type="text" />
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
      {fetchFailed && <ErrorInfo />}
      {companies.length === 300 || companies.length === filteredLength ? (
        <>
          <CompaniesList
            companiesToDisplay={currentCompanies}
            loading={loading}
            setLoading={setLoading}
          />
          <Pagination
            companiesPerPage={companiesPerPage}
            currentPage={currentPage}
            totalCompanies={display.length}
            paginate={paginate}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Table;
