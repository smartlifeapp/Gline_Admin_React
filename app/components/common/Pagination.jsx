import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ meta, onPageChange }) => {
  if (!meta.pageCount) return <div />;
  return (
    <ReactPaginate
      forcePage={meta.page - 1}
      previousLabel={'이전'}
      nextLabel={'다음'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={meta.pageCount || 0}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
};

export default Pagination;
