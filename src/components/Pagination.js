import React, { Component, PropTypes } from 'react';

export default class Pagination extends Component {
  static propTypes = {
    currentEnd: PropTypes.number,
    currentPage: PropTypes.number,
    currentStart: PropTypes.number,
    itemsPerPage: PropTypes.number.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this.calculatePagination();
  }

  componentWillReceiveProps(nextProps) {
    this.calculatePagination(nextProps);
  }

  calculatePagination(nextProps) {
    const { itemsPerPage, total } = nextProps || this.props;
    this.numOfPages = Math.ceil(total / itemsPerPage);
  }

  changePage(page, e) {
    e.preventDefault();
    const { itemsPerPage, onPaginationChange } = this.props;

    const newCurrentStart = 1 + (page - 1) * itemsPerPage;
    const newCurrentEnd = itemsPerPage + (page - 1) * itemsPerPage;

    onPaginationChange(newCurrentStart, newCurrentEnd, page);
  }

  getPages() {
    if (this.numOfPages < 2) return;
    const { currentPage } = this.props;
    const elems = [];
    let i, j;

    // calculate start/end of pagination numbers if pagination has over 5 pages
    if (currentPage - 2 < 1) {
      i = 1;
      j = 5;
    } else if (currentPage + 2 > this.numOfPages) {
      i = this.numOfPages - 5;
      j = this.numOfPages;
    } else {
      i = currentPage - 2;
      j = currentPage + 2;
    }

    // calculate if pagination has 5 or less pages, resets previous calculations
    if (this.numOfPages <= 5) {
      i = 1;
      j = this.numOfPages;
    }

    for (i; i <=j; i++) {
      elems.push(
        <li>

        </li>
      );
    }

    return elems;
  }

  render() {
    const { currentPage } = this.props;

    return (
      this.numOfPages > 1 ? (
        <ul>
          { currentPage > 3 && this.numOfPages > 5 &&
            <li></li>
          }
          { currentPage !== 1 &&
            <li></li>
          }
          {this.renderPages()}
          {currentPage !== this.numOfPages &&
            <li></li>
          }
          {currentPage < this.numOfPages - 2 && this.numOfPages > 5 &&
            <li></li>
          }
        </ul>
      ) : null
    );
  }
}
