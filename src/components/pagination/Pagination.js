import React from "react";
import styles from "../pagination/Pagination.module.scss";

const { paginationNav } = styles;

const Pagination = ({
  companiesPerPage,
  currentPage,
  totalCompanies,
  paginate
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={paginationNav}>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <a
              className={number === currentPage ? styles.currentPage : null}
              onClick={e => {
                e.preventDefault();
                paginate(number);
              }}
              href="!#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
