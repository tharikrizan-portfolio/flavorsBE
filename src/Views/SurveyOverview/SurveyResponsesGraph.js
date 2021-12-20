import React, { useState, useEffect } from "react";
import "./SurveyOrverView.css";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/Button";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  getSurveyList,
  getSurveyResponsesGraphical,
  updateFilteredSurveyList,
} from "../../actions/survey.actions";
import "../../assets/css/custom.css";
import Chip from "@material-ui/core/Chip";
import Aux from "../../hoc/_Aux";
import ResponseView from "./SurveyResponseGraphSubComponents/ResponseView";
import MaterialCircularProgress from "../components/common/Loader/MaterialCircularProgress";
import BrootStrapDropdown from "../components/common/DropDown/BrootStrapDropdown";
import SurveyResponseFilter from "../components/common/SurveyResponseFilter/SurveyResponseFilter";
import DataTable from "../components/common/SurveyTable/DataTable";
import helper from "../../util/helper";

//--- number of rows per page
const NUMBER_OF_ROWS_PER_PAGE = 6;

const SurveyResponsesGraph = ({}) => {
  const dispatch = useDispatch();

  //Redux Data
  const surveys = useSelector(
    (state) => state.surveyData?.filteredSurveyList || false
  );
  const headers = useSelector((state) => state.userData.user.headers || "");
  const chartOptionList = useSelector(
    (state) => state.surveyData?.chartOptionList?.data || []
  );
  const isFetching = useSelector(
    (state) => state.surveyData?.chartOptionList?.fetching || false
  );

  //Local states
  const [state, setState] = useState({
    surveys: [],
    data: [],
    rows: [],
    selectedSurvey: null,
    publishedSurveys: [],
    csvColumns: [],
    csvRows: [],
    columns: [],
    selectedRow: 0,
    accordionList: [],
    isAllExpanded: false,
  });
  const [maxPageCount, setMaxPageCount] = useState(1);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  //Fetch survey list
  useEffect(() => {
    dispatch(getSurveyList(headers));
  }, []);

  useEffect(() => {
    if (Boolean(surveys.length)) {
      setState({
        ...state,
        selectedSurvey: null,
      });
      const surveys_ = [...surveys];
      setMaxPageCount(Math.ceil(surveys_?.length / NUMBER_OF_ROWS_PER_PAGE));
      setPaginatedRows(surveys_?.slice(0, NUMBER_OF_ROWS_PER_PAGE));
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

  useEffect(() => {
    if (state.selectedSurvey)
      setState({
        ...state,
        accordionList: chartOptionList.map(() => false),
      });
  }, [chartOptionList]);

  const onSelectSurvey = async (surveyId) => {
    let selectedSurvey_ = surveys.filter(
      (survey) => survey.surveyId == surveyId
    );
    setState({
      ...state,
      selectedSurvey: selectedSurvey_[0],
    });
    dispatch(getSurveyResponsesGraphical(surveyId, headers));
  };

  const onCollapse = (index) => {
    const accordionList_ = state.accordionList;
    accordionList_[index] = !state.accordionList[index];

    const isAccordionExpanded = accordionList_.find((value) => value);
    setState({
      ...state,
      accordionList: [...accordionList_],
      isAllExpanded: isAccordionExpanded || false,
    });
  };

  const handleViewAll = () => {
    const isAccordionExpanded = state.accordionList.find((value) => value);
    setState({
      ...state,
      accordionList: [...state.accordionList.map(() => !isAccordionExpanded)],
      isAllExpanded: !isAccordionExpanded,
    });
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
          onClick={() => onSelectSurvey(tableRow.surveyId)}
        >
          <EqualizerIcon fontSize="small" style={{ color: "#00966B" }} />
        </IconButton>
      ),
    };
  });

  const onPageChange = (event, pageNumber) => {
    const start = Math.max(pageNumber - 1, 0) * NUMBER_OF_ROWS_PER_PAGE;
    setPaginatedRows(surveys.slice(start, start + NUMBER_OF_ROWS_PER_PAGE));
    setCurrentPage(pageNumber);
  };

  const QuestionDropdown = () => {
    return (
      <Row>
        <Col xs="6" xl="6" lg="6">
          <BrootStrapDropdown
            label="Select Survey"
            handleSelect={onSelectSurvey}
            options={
              surveys?.map((optSurveys) => {
                return {
                  value: optSurveys.surveyId,
                  label: optSurveys.title,
                };
              }) || []
            }
            value={state.selectedSurvey?.id || null}
          />
        </Col>
        <Col xs="6" xl="6" lg="6" className="expand-button"></Col>
      </Row>
    );
  };

  const graphicalViewNavigationButtons = () => {
    return (
      <Row>
        <Col xs="6" xl="6" lg="6">
          <IconButton
            variant="outlined"
            onClick={() =>
              setState({
                ...state,
                selectedSurvey: null,
              })
            }
          >
            <ArrowBackIcon fontSize="small" style={{ color: "grey" }} />
          </IconButton>
        </Col>
        <Col xs="6" xl="6" lg="6" className="expand-button">
          <IconButton variant="outlined" onClick={() => handleViewAll()}>
            {state.isAllExpanded ? (
              <ExpandLessIcon fontSize="small" style={{ color: "#00966B" }} />
            ) : (
              <KeyboardArrowDownIcon
                fontSize="small"
                style={{ color: "#00966B" }}
              />
            )}
          </IconButton>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Aux>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Graphical View of survey response</Card.Title>
            <SurveyResponseFilter />
          </Card.Header>
        </Card>
      </Aux>
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Body>
                  {!state.selectedSurvey ? (
                    <DataTable
                      paginatedRows={tableRows}
                      maxPageCount={maxPageCount}
                      onPageChange={onPageChange}
                      tableHeadersArray={tableHeaderList}
                    />
                  ) : isFetching ? (
                    <div className="graphical-view-loader">
                      <MaterialCircularProgress />
                    </div>
                  ) : (
                    <>
                      {state.selectedSurvey && graphicalViewNavigationButtons()}
                      {chartOptionList &&
                        chartOptionList.map((chartData, index) => {
                          return (
                            <Accordion
                              expanded={Boolean(state.accordionList[index])}
                            >
                              <AccordionSummary
                                aria-controls="panel1d-content"
                                id="panel1d-header"
                                eventKey={index + 1}
                                onClick={() => onCollapse(index)}
                              >
                                {state.accordionList[index] ? (
                                  <div className="question-collapse">
                                    <i className="fas fa-chevron-circle-down question-collapse"></i>{" "}
                                    <span>{chartData.questionName}</span>
                                  </div>
                                ) : (
                                  <div className="question-collapse">
                                    <i class="fas fa-chevron-circle-right "></i>{" "}
                                    <span>{chartData.questionName}</span>
                                    <b className="question-collapse-responses-title">
                                      {` - Total Responses Count :
                                   ${chartData.totalResponsesCount}`}
                                    </b>
                                  </div>
                                )}
                              </AccordionSummary>
                              <AccordionDetails
                                raised={true}
                                eventKey={index + 1}
                              >
                                <Grid container spacing={1}>
                                  <Grid item xs={12} md={12} lg={12}>
                                    <div className="chart-response-count">
                                      <b className="question-collapse-responses-title">{`Total Responses Count :
                           ${chartData.totalResponsesCount}`}</b>
                                    </div>
                                  </Grid>
                                  <ResponseView
                                    chartData={chartData}
                                    index={index}
                                  />
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                    </>
                  )}
                </Card.Body>
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Aux>
    </>
  );
};

SurveyResponsesGraph.propTypes = {};

export default SurveyResponsesGraph;
