import React, { memo } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import IconButton from "@material-ui/core/Button";
import StorageIcon from "@material-ui/icons/Storage";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import "./DashboardTable.css";

const DataTable = ({
  paginatedRows,
  maxPageCount,
  onPageChange,
  tableHeadersArray,
  currentPage,
}) => {
  //--- data row
  const rows = paginatedRows?.map((row, index) => (
    <tr key={index}>
      {Object.keys(row).map((key, index) => (
        <td key={index}>{row[key]}</td>
      ))}
    </tr>
  ));
  const tableHeaders = tableHeadersArray?.map((header, index) => (
    <th key={index} className="header-size">
      {header.name}
      {header.sort && (
        <IconButton
          style={{ outline: "none", maxHeight: "4px", maxWidth: "4px" }}
          onClick={() => header.sortFunc(header.isSorted)}
        >
          {header.isSorted ? (
            <KeyboardArrowDownIcon
              fontSize="small"
              style={{ color: "#00966B" }}
            />
          ) : (
            <ExpandLessIcon fontSize="small" style={{ color: "grey" }} />
          )}
        </IconButton>
      )}
    </th>
  ));
  return (
    <div>
      {rows.length ? (
        <>
          <Table responsive bordered hover  style={{minHeight:'480px'}}>
            <thead className="table-background-color">
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody className="table-row-background-color">{rows}</tbody>
          </Table>
          {/* pagination page indexes */}
          <Pagination
            count={maxPageCount}
            variant="outlined"
            shape="rounded"
            className="pagination"
            onChange={onPageChange}
            page={currentPage}
          />
        </>
      ) : (
        <div className="no-data-message">
          <StorageIcon fontSize="large" />
          No records available
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  paginatedRows: PropTypes.array,
  maxPageCount: PropTypes.number,
  onPageChange: PropTypes.func,
  tableHeadersArray: PropTypes.array,
  currentPage: PropTypes.number,
};

export default memo(DataTable);
