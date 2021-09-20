import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import * as _ from 'lodash';
import React from 'react';

interface IPaginationState {
  page: number;
  rowsPerPage: number;
}

/* tslint lines-between-class-members: ["error", "always"]*/
interface IState {
  paginationState: IPaginationState;
  localTableState: object[];
}

interface ITableProps {
  tableHeaders: string[];
  tableData: object[];
  totalRows?: number;
  tableTitle: string;
  deleteAction: any;
}

class Table extends React.Component<ITableProps, IState> {
  public initialState = {
    paginationState: {
      page: 0,
      rowsPerPage: 5,
    } as IPaginationState,
    localTableState: [],
  } as IState;

  public state: IState = this.initialState;
  constructor(props: ITableProps) {
    super(props);
  }

  public handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    const propertyValues = { ...this.state.paginationState };
    propertyValues.page = newPage;
    this.setState({ paginationState: propertyValues });
  };

  public handleChangeRowsPerPage = (event: any) => {
    const propertyValues = { ...this.state.paginationState };
    propertyValues.page = 0;
    propertyValues.rowsPerPage = +event.target.value;
    this.setState({ paginationState: propertyValues });
  };

  public handleDelete = (row: any) => {
    this.props.deleteAction(row);
  };

  /**
   * Sort Table
   *
   */

  public SortTable = (config) => {
    const defaultConfig = {
      sortTableSelector: '.neo-table--sortable',
      tableHeaderAscClass: 'neo-table--ascending',
      tableHeaderDescClass: 'neo-table--descending',
      tableHeaderSortSelector: '[data-sortby]',
      tableHeaderFilterSelector: '[data-filterby]',
    };

    const items = config.items;
    const table = document.querySelector(config.el);
    const sortingHeaders = table.querySelectorAll(
      defaultConfig.tableHeaderSortSelector,
    );
    const filteringHeaders = table.querySelectorAll(
      defaultConfig.tableHeaderFilterSelector,
    );

    let filteredCollection = [].concat(items);

    /**
     * init
     *
     * @description Initializes the component by attaching event listeners to each of the table headers.
     * Returns nothing.
     */
    const init = () => {
      for (let i = 0; i < sortingHeaders.length; i++) {
        handleSort(sortingHeaders[i]);
      }

      for (let i = 0; i < filteringHeaders.length; i++) {
        handleFilter(filteringHeaders[i]);
      }

      generateTable(items);
    };

    /**
     * handleSort
     *
     * @description Handles click event listeners on each of the headers.
     * Returns nothing.
     * @param {HTMLElement} header The header to listen for events on
     */
    const handleSort = (header) => {
      header.addEventListener('click', function() {
        // Sort by property
        const sortBy = header.dataset.sortby;

        // If order is 'asc' set order to 'desc'
        // If order is 'desc' set order to ''
        // else order should be 'asc'
        const order =
          header.dataset.order === 'asc'
            ? 'desc'
            : header.dataset.order === 'desc'
            ? ''
            : 'asc';

        // Remove asc, desc classes and orders
        for (let i = 0; i < sortingHeaders.length; i++) {
          sortingHeaders[i].classList.remove(defaultConfig.tableHeaderAscClass);
          sortingHeaders[i].classList.remove(
            defaultConfig.tableHeaderDescClass,
          );
          sortingHeaders[i].dataset.order = '';
        }

        header.dataset.order = order;

        if (order) {
          header.classList.add(
            order === 'asc'
              ? defaultConfig.tableHeaderAscClass
              : defaultConfig.tableHeaderDescClass,
          );
        }

        generateTable(sort(filteredCollection, sortBy, order));
      });
    };

    /**
     * sort
     *
     * @description Sort items
     * Returns {Array} sortedItems Sorted Array.
     * @param {Array} collection Collection that should be sorted
     * @param {String} sortBy Sort by property
     * @param {String} order Previous order ['', 'asc', 'desc']
     */
    const sort = (collection, sortBy, order) => {
      // Makes initial array immutable
      const sortedItems = [].concat(collection);

      if (!sortBy || !order) {
        return sortedItems;
      }

      sortedItems.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

      if (order === 'desc') {
        sortedItems.reverse();
      }

      return sortedItems;
    };

    /**
     * handleFilter
     *
     * @description Handles change event listeners on each input or selectbox
     * Returns nothing.
     * @param {HTMLElement} filterElement Filter element
     */
    const handleFilter = (filterElement) => {
      // Sort information
      let sortData;
      // Transform node list into array
      const elements = [...filteringHeaders];
      // Set event types for selectbox (change) and input (keyup)
      const eventType =
        filterElement.tagName.toLowerCase() === 'select' ? 'change' : 'keyup';

      filterElement.addEventListener(eventType, () => {
        // Get collectoon of filter criteria
        const activeFilterFields = elements
          .filter((item) => item.value)
          .map((item) => {
            return {
              name: item.dataset.filterby,
              value: item.value,
            };
          });

        sortData = getSortData();
        filteredCollection = sort(
          filter(activeFilterFields),
          sortData.sortby,
          sortData.order,
        );
        generateTable(filteredCollection);
      });
    };

    /**
     * filter
     *
     * @description Filter items
     * Returns {Array} filteredCollection Filtered Array.
     * @param {Object} filterFields Filter data
     */
    const filter = (filterFields) => {
      let filteredCollection = [].concat(items);

      if (filterFields) {
        filteredCollection = filteredCollection.filter((filterObj) => {
          return filterFields.every((item) => {
            return filterObj[item.name]
              .toLowerCase()
              .includes(item.value.toLowerCase());
          });
        });
      }

      return filteredCollection;
    };

    function getSortData() {
      let sortData = {
        sortby: undefined,
        order: undefined,
      };

      for (let i = 0; i < sortingHeaders.length; i++) {
        if (sortingHeaders[i].dataset.order) {
          sortData = {
            sortby: sortingHeaders[i].dataset.sortby,
            order: sortingHeaders[i].dataset.order,
          };
        }
      }

      return sortData;
    }

    /**
     * generateTable
     *
     * @description Generates table
     * Returns nothing.
     * @param {Array} items Array that should be printend
     */
    const generateTable = (items: object[]) => {
      this.setState({ localTableState: items });
    };

    /**
     * Returns public methods
     */
    return {
      init,
    };
  };

  public disconnectedCallback() {}

  public componentWillReceiveProps(nextProps) {
    // Re-init the table when the parent props change
    // due to table holding local state
    if (nextProps.tableData !== this.props.tableData) {
      const userState = nextProps.tableData;
      const table = this.SortTable({
        el: '#neo-sort-example',
        items: userState,
      });
      table.init();
    }
  }

  public componentDidMount() {
    // Regular React lifecycle method
    const userState =
      this.props.tableData.length > 0 ? this.props.tableData : [];

    const table = this.SortTable({
      el: '#neo-sort-example',
      items: userState,
    });
    table.init();
  }

  public webComponentAttached() {
    // will be called when the Web Component has been attached
  }

  public render(): JSX.Element {
    // HTML below relies on NEO CSS Framework, which is available in UWF.
    // See NEO documentation for more examples.
    // Elements can subscribe to standard React HTML events.
    const tableHeader = (
      <>
        <tr>
          {this.props.tableHeaders.map((header, index) => (
            <th data-sortby={header}>{_.startCase(header)}</th>
          ))}
          {this.props.deleteAction ? <th>{'Actions'}</th> : null}
        </tr>
        <tr>
          {this.props.tableHeaders.map((header, index) => (
            <td>
              {/*
              // @ts-ignore */}
              <input
                class="neo-input"
                data-filterby={header}
                placeholder={`Filter by ${_.startCase(header)}`}
                aria-label={_.startCase(header)}
                role="textbox"
              />
            </td>
          ))}
        </tr>
      </>
    );

    const TableActions = (props) => {
      return (
        <td>
          <button
            class="neo-btn neo-btn--warning neo-icon-trash"
            onClick={() => this.handleDelete(props.row)}
          />
        </td>
      );
    };

    const tableRows = this.state.localTableState.length
      ? this.state.localTableState
          .slice(
            this.state.paginationState.page *
              this.state.paginationState.rowsPerPage,
            this.state.paginationState.page *
              this.state.paginationState.rowsPerPage +
              this.state.paginationState.rowsPerPage,
          )
          .map((row, index) => (
            <tr key={index} data-item={row}>
              {/* filter out columns not not in props.tableHeaders
                           sort columns keys according to props.tableHeaders order
                           sort columns keys according to props.tableHeaders order*/}
              {Object.keys(row)
                .filter((key) => this.props.tableHeaders.includes(key))
                .sort(
                  (keyA, keyB) =>
                    this.props.tableHeaders.indexOf(keyA) -
                    this.props.tableHeaders.indexOf(keyB),
                )
                .map((key) => (
                  <td data-title={key}>{row[key]}</td>
                ))}
              {this.props.deleteAction ? <TableActions row={row} /> : null}
            </tr>
          ))
      : null;

    const paginationToolbar = (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={this.props.totalRows}
        rowsPerPage={this.state.paginationState.rowsPerPage}
        page={this.state.paginationState.page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    );
    return (
      <div>
        <div className="neo-widget__header neo-icon-customer">
          {this.props.tableTitle}
        </div>
        <div className="neo-widget__content neo-widget__content--indented">
          <div className="row">
            <Paper>
              {/*
              // @ts-ignore */}
              <table
                id="neo-sort-example"
                class="neo-table neo-table--sortable">
                <thead>{tableHeader}</thead>
                <tbody>{tableRows}</tbody>
              </table>
            </Paper>
          </div>
        </div>
        {/*
        // @ts-ignore */}
        <div class="row">{paginationToolbar}</div>
      </div>
    );
  }
}
export default Table;
