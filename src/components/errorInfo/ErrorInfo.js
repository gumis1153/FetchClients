import React from "react";
import styles from "../errorInfo/ErrorInfo.module.scss";

const ErrorInfo = () => {
  return (
    <div className={styles.errorInfo}>
      <h1>:(</h1>
      <br />
      <p>Sorry, something went wrong...</p>
    </div>
  );
};

export default ErrorInfo;
