import React, { PureComponent } from 'react';
import classnames from 'classnames';
import styles from './Pagination.css';

class Pagination extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const {items} = this.props;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 2
        pageSize = pageSize || 2;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to repeat in the pager control
        const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        const { pager } = this.state;

        const pageCount = pager.pages.length > 5 &&
            <div className={styles.pageCount}>
                <span>{`Showing ${pager.startIndex + 1}`}</span>
                {pager.startIndex !== pager.endIndex && <span>{`, ${pager.endIndex + 1}`}</span>}
                <span>{` of ${pager.totalItems}`}</span>
            </div>;

        return (
            <div>
                <ul className={classnames('pagination', styles.paginationOverrides)}>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage - 1)}>
                            <span aria-hidden="true">&#x2039;</span>
                        </a>
                    </li>
                    {pager.pages.length <= 5 && pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage + 1)}>
                            <span aria-hidden="true">&#8250;</span>
                        </a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.totalPages)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
                {pageCount}
            </div>

        );
    }
}

export default Pagination;