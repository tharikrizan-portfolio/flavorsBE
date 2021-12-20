import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/Button";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";

import {
  deleteSurvey,
  getSurveyList,
  getSurveyResponses,
  publishStatusChanged,
  updateFilteredSurveyList,
} from "../../actions/survey.actions";
import "../../assets/css/custom.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import { MDBIcon } from "mdbreact";
import Aux from "../../hoc/_Aux";
import CsvDownloader from "react-csv-downloader";
import SurveyResponseFilter from "../components/common/SurveyResponseFilter/SurveyResponseFilter";
import DataTable from "../components/common/SurveyTable/DataTable";
import helper from "../../util/helper";
import MaterialCircularProgress from "../components/common/Loader/MaterialCircularProgress";
import SurveyResponseFilterDashboard from "../components/common/SurveyResponseFilter/SurveyResponseFilterDashboard";
import BootstrapModal from "../components/common/Modal/BootstrapModal";


//--- number of rows per page
const NUMBER_OF_ROWS_PER_PAGE = 6;

const SurveyResponses = (props) => {
  const dispatch = useDispatch();

  //redux data
  const headers = useSelector((state) => state.userData?.user?.headers || "");
  const surveys = useSelector(
    (state) => state.surveyData?.filteredSurveyList || []
  );
  const csvObject = useSelector((state) => state.surveyData?.csvObject || {});

  //local states
  const [state, setState] = useState({
    surveys: [],
    data: [],
    rows: [],
    selectedSurvey: null,
    publishedSurveys: [],
    csvColumns: [],
    csvRows: [],
    columns: [],
  });
  const [maxPageCount, setMaxPageCount] = useState(1);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloadModelOpen, setIsDownloadModelOpen] = useState(false);
  const [tableHeaderList, setTableHeaderList] = useState([
    {
      name: "Title",
      sort: true,
      isSorted: false,
      fieldName: "title",
      dataType: "html",
      sortFunc: (isAscOrder) =>
        sortFunc(isAscOrder, "string", "title", "Title"),
    },
    {
      name: "StartDate",
      sort: true,
      isSorted: false,
      fieldName: "startAt",
      dataType: "date",
      sortFunc: (isAscOrder) =>
        sortFunc(isAscOrder, "date", "startAt", "StartDate"),
    },
    {
      name: "Published",
      sort: true,
      isSorted: false,
      fieldName: "isPublished",
      dataType: "boolean",
      sortFunc: (isAscOrder) =>
        sortFunc(isAscOrder, "boolean", "isPublished", "StartDate"),
    },
    { name: "Actions" },
  ]);

  const sortFunc = (isAscOrder, type, fieldName, headerName) => {
    setTableHeaderList([
      ...tableHeaderList.map((tHeader) => {
        return tHeader.name === headerName
          ? { ...tHeader, isSorted: !isAscOrder }
          : { ...tHeader, isSorted: false };
      }),
    ]);
    helper.sortDataRows(surveys, type, !isAscOrder, fieldName);
    dispatch(updateFilteredSurveyList([...surveys]));
  };

  useEffect(() => {
    dispatch(getSurveyList(headers));
  }, []);

  useEffect(() => {
    if (Boolean(surveys.length)) {
      const surveys_ = [...surveys];
      const start = Math.max(currentPage - 1, 0) * NUMBER_OF_ROWS_PER_PAGE;
      setMaxPageCount(Math.ceil(surveys_?.length / NUMBER_OF_ROWS_PER_PAGE));
      const slicedSurveys = surveys_?.slice(
        start,
        start + NUMBER_OF_ROWS_PER_PAGE,
        NUMBER_OF_ROWS_PER_PAGE
      );
      setPaginatedRows(slicedSurveys);
      !slicedSurveys.length && onPageChange(null, 1);
    } else {
      setMaxPageCount(1);
      setPaginatedRows([]);
    }
    setTableHeaderList(
      tableHeaderList.map((header) => {
        return {
          ...header,
          sortFunc: (isAscOrder) =>
            sortFunc(
              isAscOrder,
              header.dataType,
              header.fieldName,
              header.name
            ),
        };
      })
    );
  }, [surveys]);

  const onPageChange = (event, pageNumber) => {
    const start = Math.max(pageNumber - 1, 0) * NUMBER_OF_ROWS_PER_PAGE;
    setPaginatedRows(surveys.slice(start, start + NUMBER_OF_ROWS_PER_PAGE));
    setCurrentPage(pageNumber);
  };

  const tableRows = paginatedRows.map((tableRow) => {
    return {
      title: helper.convertHtmlTextToString(tableRow.title),
      startAt: tableRow.startAt,
      published: tableRow.isPublished ? (
        <span class="badge badge-success">Published</span>
      ) : (
        <span class="badge badge-secondary">Not published</span>
      ),
      action: (
        <IconButton
          variant="outlined"
          onClick={() => {
            dispatch(
              getSurveyResponses(
                { surveyId: tableRow.surveyId, title: tableRow.title },
                headers
              )
            );
            setIsDownloadModelOpen(true);
          }}
        >
          <GetAppIcon
            fontSize="small"
            style={{ color: "#00966B", borderRadius: "0px" }}
          />
        </IconButton>
      ),
    };
  });

  const modalBody = (
    <>
      <>
        <Row>
          <b style={{ margin: "auto", padding: "2px" }}>
            {csvObject?.csv?.fetching
              ? `Initializing download`
              : csvObject?.csv?.data
              ? `Survey: ${helper.convertHtmlTextToString(csvObject.title)}`
              : csvObject?.csv?.message}
          </b>
        </Row>
        <br />
        <div className="row float-right">
          {csvObject?.csv?.fetching ? (
            <div style={{ margin: "auto", paddingRight: "10px" }}>
              <MaterialCircularProgress size={28} />
            </div>
          ) : (
            csvObject?.csv?.data && (
              <CsvDownloader
                filename={helper.convertHtmlTextToString(csvObject.title) || ""}
                separator=","
                noHeader={false}
                columns={csvObject.csv?.csvColumns || ""}
                datas={csvObject.csv?.csvRows || ""}
              >
                <Button
                  outline
                  variant="success"
                  size="sm"
                  onClick={() => setIsDownloadModelOpen(false)}
                >
                  Download
                </Button>
              </CsvDownloader>
            )
          )}
          <Button
            outline
            variant="danger"
            size="sm"
            onClick={() => setIsDownloadModelOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </>
    </>
  );

  return (
    <>
      <Aux>
        <BootstrapModal
          show={isDownloadModelOpen}
          message="Download CSV"
          onHide={() => setIsDownloadModelOpen(false)}
          size="md"
        >
          {modalBody}
        </BootstrapModal>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Survey Responses</Card.Title>
            <SurveyResponseFilterDashboard />
          </Card.Header>
        </Card>
      </Aux>
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Body className="card-body">
                  <DataTable
                    paginatedRows={tableRows}
                    maxPageCount={maxPageCount}
                    onPageChange={onPageChange}
                    tableHeadersArray={tableHeaderList}
                    currentPage={currentPage}
                  />
                </Card.Body>
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Aux>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSurveyList: (headers) => {
      dispatch(getSurveyList(headers));
    },
    onSurveyResponses: (surveyId, headers) => {
      dispatch(getSurveyResponses(surveyId, headers));
    },
  };
};

export default memo(SurveyResponses);
