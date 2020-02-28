import React from "react";
import styles from "../companiesList/CompaniesList.module.scss";

const CompaniesList = ({ companies, loading }) => {
  const { tableResults, loadingContainer, loadingBox, list } = styles;
  if (loading) {
    return (
      <ul className={tableResults}>
        <li className={loadingContainer}>
          <div className={loadingBox}></div>
          <span>Loading</span>
        </li>
      </ul>
    );
  }
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
