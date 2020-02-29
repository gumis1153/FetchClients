import React from "react";
import styles from "../companiesList/CompaniesList.module.scss";

const CompaniesList = ({ companies, loading, setLoading }) => {
  const { tableResults, list } = styles;

  return (
    <ul className={tableResults}>
      {companies.map(
        ({ id, name, city, lastMonthIncome, averageIncome, totalIncome }) => (
          <li key={id} className={list}>
            <div>{id}</div>
            <div>{name}</div>
            <div>{city}</div>
            <div>{`$ ${lastMonthIncome}`}</div>
            <div>{`$ ${averageIncome}`}</div>
            <div>{`$ ${totalIncome}`}</div>
          </li>
        )
      )}
    </ul>
  );
};

export default CompaniesList;
