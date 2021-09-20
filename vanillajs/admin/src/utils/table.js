/**
 * Sort Table
 *
 */
export const SortTable = config => {
  const defaultConfig = {
    sortTableSelector: ".neo-table--sortable",
    tableHeaderAscClass: "neo-icon-chevron-up",
    tableHeaderDescClass: "neo-icon-chevron-down",
    tableHeaderSortSelector: "[data-sortby]",
    tableHeaderFilterSelector: "[data-filterby]"
  };

  const items = config.items;
  const table = config.el;
  const sortingHeaders = table.querySelectorAll(
    defaultConfig.tableHeaderSortSelector
  );
  const filteringHeaders = table.querySelectorAll(
    defaultConfig.tableHeaderFilterSelector
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
  const handleSort = header => {
    header.addEventListener("click", function() {
      // Sort by property
      const sortBy = header.dataset.sortby;

      // If order is 'asc' set order to 'desc'
      // If order is 'desc' set order to ''
      // else order should be 'asc'
      let order =
        header.dataset.order === "asc"
          ? "desc"
          : header.dataset.order === "desc"
          ? ""
          : "asc";

      // Remove asc, desc classes and orders
      for (let i = 0; i < sortingHeaders.length; i++) {
        sortingHeaders[i].classList.remove(defaultConfig.tableHeaderAscClass);
        sortingHeaders[i].classList.remove(defaultConfig.tableHeaderDescClass);
        sortingHeaders[i].dataset.order = "";
      }

      header.dataset.order = order;

      if (order) {
        header.classList.add(
          order === "asc"
            ? defaultConfig.tableHeaderAscClass
            : defaultConfig.tableHeaderDescClass
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
    let sortedItems = [].concat(collection);

    if (!sortBy || !order) return sortedItems;

    sortedItems.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

    if (order === "desc") {
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
  const handleFilter = filterElement => {
    // Sort information
    let sortData;
    // Transform node list into array
    let elements = [...filteringHeaders];
    // Set event types for selectbox (change) and input (keyup)
    let eventType =
      filterElement.tagName.toLowerCase() === "select" ? "change" : "keyup";

    filterElement.addEventListener(eventType, () => {
      // Get collection of filter criteria
      let activeFilterFields = elements
        .filter(item => item.value)
        .map(item => {
          return {
            name: item.dataset.filterby,
            value: item.value
          };
        });

      sortData = getSortData();
      filteredCollection = sort(
        filter(activeFilterFields),
        sortData.sortby,
        sortData.order
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
  const filter = filterFields => {
    let filteredCollection = [].concat(items);

    if (filterFields) {
      filteredCollection = filteredCollection.filter(filterObj => {
        return filterFields.every(item => {
          return filterObj[item.name]
            .toLowerCase()
            .includes(item.value.toLowerCase());
        });
      });
    }

    return filteredCollection;
  };

  /**
   * generateTable
   *
   * @description Generates table
   * Returns nothing.
   * @param {Array} items Array that should be printend
   */
  const generateTable = items => {
    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
      const tr = document.createElement("tr", { is: "user-tr" });
      tr.user = items[i];
      tableBody.append(tr);
    }
  };

  function getSortData() {
    let sortData = {
      sortby: undefined,
      order: undefined
    };

    for (let i = 0; i < sortingHeaders.length; i++) {
      if (sortingHeaders[i].dataset.order) {
        sortData = {
          sortby: sortingHeaders[i].dataset.sortby,
          order: sortingHeaders[i].dataset.order
        };
      }
    }

    return sortData;
  }
  /**
   * Returns public methods
   */
  return {
    init: init
  };
};

// let table = SortTable({ el: "#neo-sort-example", items: tableItems });
// table.init();
