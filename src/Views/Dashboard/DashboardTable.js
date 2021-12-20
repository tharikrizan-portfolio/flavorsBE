import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSurveyTableInfo } from "../../actions/summary.actions";

import { activeStateTypes } from "../../util/enumerations";
import moment from "moment";
import MaterialCircularProgress from "../components/common/Loader/MaterialCircularProgress";
import SurveyDataTable from "./Subcomponents/SurveyDataTable";

//--- number of rows per page
const NUMBER_OF_ROWS_PER_PAGE = 5;
//--- cache time

const CACHE_TIME = 5 * 1000;

/**
 * Survey table showing the most recent surveys
 */
const DashboardTable = () => {
  //--- data
  const lastUpdatedTime = useRef(0);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("all");
  const allSurveys = useSelector(
    (state) => state.surveyData.filteredSurveyList
  );
  const istableDataFetching = useSelector(
    (state) => state.surveyData?.surveyListForTable?.fetching || false
  );
  const headers = useSelector((state) => state.userData.user.headers);
  const dispatch = useDispatch();

  //--- predicates
  const filterActiveState = (survey) => {
    if (currentFilter === activeStateTypes.ALL || !currentFilter) {
      return true;
    } else if (survey.isActive && currentFilter === activeStateTypes.ACTIVE) {
      return true;
    } else if (
      !survey.isActive &&
      currentFilter === activeStateTypes.IN_ACTIVE
    ) {
      return true;
    }
    return false;
  };

  const surveys = allSurveys?.length
    ? allSurveys.filter(filterActiveState)
    : null;

  useEffect(() => {
    dispatch(getSurveyTableInfo(headers));
  }, []);

  //--- on init
  useEffect(() => {
    //--- to make sure that server request is not being sent every time the page number changes
    const currentTime = moment().valueOf();
    if (!surveys || currentTime - lastUpdatedTime.current > CACHE_TIME) {
      lastUpdatedTime.current = currentTime;
    }
    setMaxPageCount(Math.ceil(surveys?.length / NUMBER_OF_ROWS_PER_PAGE));
    setPaginatedRows(surveys?.slice(0, NUMBER_OF_ROWS_PER_PAGE));

    return () => {
      lastUpdatedTime.current = 0;
    };
  }, [currentFilter, surveys?.length]);

  //--- event handlers
  const onPageChange = (event, pageNumber) => {
    const start = Math.max(pageNumber - 1, 0) * NUMBER_OF_ROWS_PER_PAGE;
    setPaginatedRows(surveys.slice(start, start + NUMBER_OF_ROWS_PER_PAGE));
    setCurrentPage(pageNumber);
  };

  const renderedTable = istableDataFetching ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MaterialCircularProgress />
    </div>
  ) : (
    <SurveyDataTable
      paginatedRows={paginatedRows}
      setCurrentFilter={setCurrentFilter}
      maxPageCount={maxPageCount}
      onPageChange={onPageChange}
      tableHeadersArray={[
        "",
        "Title",
        "Responses",
        "Questions",
        "Created Date",
        "Form Status",
        "Form Responses",
        "Form Action",
      ]}
    />
  );

  return <>{renderedTable}</>;
};

export default DashboardTable;
