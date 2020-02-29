import React from "react";
import styles from "../companiesList/CompaniesList.module.scss";

const { tableResults, loadingContainer, loadingBox } = styles;

const Loading = () => {
  return (
    <ul className={tableResults}>
      <li className={loadingContainer}>
        <div className={loadingBox}></div>
        <span>Loading.</span>
      </li>
    </ul>
  );
};

export default Loading;
