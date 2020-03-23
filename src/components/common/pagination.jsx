import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  let firstPage = currentPage;
  let lastPage = currentPage + 3;
  if (pagesCount <= 1) return null;
  else {
    const numberOfPages = pagesCount === 2 ? 2 : 3;
    console.log(numberOfPages);
    if (lastPage >= pagesCount + 1) lastPage = pagesCount + 1;
    if (lastPage - firstPage < numberOfPages)
      firstPage = pagesCount - (numberOfPages - 1);
  }
  const pages = _.range(firstPage, lastPage);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          {pagesCount > 1 && (
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage, "prev")}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          )}
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className="page-item">
          {pagesCount > 1 && (
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage, "next", pagesCount)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
