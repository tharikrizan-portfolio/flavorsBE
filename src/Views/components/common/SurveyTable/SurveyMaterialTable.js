import React, { memo, useState, useEffect } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import "./DashboardTable.css";
import moment from "moment";
import { convertHTMLTagToInnerText } from "../../../../util/helper";
import helper from "../../../../../src/util/helper";
import { MDBIcon } from "mdbreact";
import {
  deleteSurvey,
  getSurveyResponses,
  getSurveyResponsesGraphical,
  viewSurvey,
} from "../../../../actions/survey.actions";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import MaterialCircularProgress from "../../common/Loader/MaterialCircularProgress";
import CsvDownloader from "react-csv-downloader";
import Aux from "../../../../hoc/_Aux";
import BootstrapModal from "../../../components/common/Modal/BootstrapModal";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  makeStyles,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Grid } from "@material-ui/core";
import ResponseView from "../../../../Views/SurveyOverview/SurveyResponseGraphSubComponents/ResponseView";
import { getSurveyQuestions } from "../../../../actions/updateQuestion.actions";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const SurveyMaterialTable = ({
  paginatedRows,
  maxPageCount,
  onPageChange,
  tableHeadersArray,
}) => {
  const getResponseCount = (questions) => {
    return questions
      ?.reduce((max, question) => Math.max(question?.answers?.length, max), 0)
      .toString();
  };

  const dispatch = useDispatch();

  const headers = useSelector((state) => state.userData?.user?.headers || "");

  const csvObject = useSelector((state) => state.surveyData?.csvObject || {});

  const chartOptionList = useSelector(
    (state) => state.surveyData?.chartOptionList?.data || []
  );
  const isFetching = useSelector(
    (state) => state.surveyData?.chartOptionList?.fetching || false
  );

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

  const [Id, setId] = useState("");
  const [isDownloadModelOpen, setIsDownloadModelOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles((theme) => ({
    table: {
      marginTop: theme.spacing(3),
      "& thead th": {
        fontWeight: "600",
        color: theme.palette.darkHeader,
        backgroundColor: "#D6EAF8",
      },
      "& tbody td": {
        fontWeight: "300",
      },
      "& tbody tr:hover": {
        backgroundColor: "#fffbf2",
      },
    },
  }));

  const classes = useStyles();

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  useEffect(() => {
    if (state.selectedSurvey)
      setState({
        ...state,
        accordionList: chartOptionList.map(() => false),
      });
  }, [chartOptionList]);

  const onSelectSurvey = async (surveyId) => {
    const selectedSurvey_ = paginatedRows.filter(
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

  const dataRows = paginatedRows?.map((survey) => (
    <TableRow key={survey.surveyId}>
      <TableCell>{convertHTMLTagToInnerText(survey.title)}</TableCell>
      <TableCell align="center">{getResponseCount(survey.questions)}</TableCell>
      <TableCell align="center">{survey.questions?.length}</TableCell>
      <TableCell>{moment(survey.createdAt).format("MMMM do, YYYY")}</TableCell>
      <TableCell>{survey.isActive ? "Active" : "In Active"}</TableCell>
      <TableCell>
        <Tooltip title="Download Survey">
          <IconButton
            variant="outlined"
            onClick={() => {
              dispatch(
                getSurveyResponses(
                  { surveyId: survey.surveyId, title: survey.title },
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
        </Tooltip>{" "}
        <Tooltip title="Statistics">
          <IconButton
            variant="outlined"
            onClick={() => onSelectSurvey(survey.surveyId)}
          >
            <EqualizerIcon fontSize="small" style={{ color: "#00966B" }} />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="Delete Survey">
          <IconButton
            variant="outlined"
            onClick={(e) => {
              handleOpen(survey.surveyId);
            }}
            id={survey}
          >
            <DeleteIcon
              fontSize="small"
              style={{ color: "red", borderRadius: "0px" }}
            />
          </IconButton>
        </Tooltip>{" "}
        <Tooltip title="Update Survey">
          <IconButton
            variant="outlined"
            onClick={() => {
              dispatch(viewSurvey(survey.surveyId, headers));
              dispatch(getSurveyQuestions(survey.surveyId, headers));
            }}
            id={survey}
          >
            {" "}
            <EditIcon
              fontSize="small"
              style={{ color: "00966B", borderRadius: "0px" }}
            />{" "}
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));

  const modalBody = (
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
  );

  const modalDelete = (
    <>
      <div className="row float-right">
        <Button
          outline
          variant="danger"
          size="sm"
          onClick={() => {
            dispatch(deleteSurvey(Id, headers));
          }}
        >
          Yes
        </Button>
        <Button
          outline
          variant="success"
          size="sm"
          onClick={() => setOpen(false)}
        >
          No
        </Button>
      </div>
    </>
  );

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

  const tableHeaders = tableHeadersArray?.map((header) => (
    <TableCell key={header}>{header}</TableCell>
  ));

  const graphTableBody = (
    <>
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Body>
                  {!state.selectedSurvey ? (
                    <div>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>{tableHeaders}</TableRow>
                        </TableHead>
                        <TableBody>{dataRows}</TableBody>
                      </Table>
                      <br />
                      {/* pagination page indexes */}
                      <div>
                        <Pagination
                          count={maxPageCount}
                          color="primary"
                          className="pagination"
                          onChange={onPageChange}
                        />
                      </div>
                    </div>
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
                                      {` - Total Responses Count : ${chartData.totalResponsesCount}`}
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
                                      <b className="question-collapse-responses-title">{`Total Responses Count : ${chartData.totalResponsesCount}`}</b>
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

  return (
    <div className="survey-table">
      <Aux>
        <BootstrapModal
          show={isDownloadModelOpen}
          message="Download CSV"
          onHide={() => setIsDownloadModelOpen(false)}
          size="md"
        >
          {modalBody}
        </BootstrapModal>
      </Aux>
      <Aux>
        <BootstrapModal
          show={open}
          message="Are you sure?"
          onHide={() => setOpen(false)}
          size="md"
        >
          {modalDelete}
        </BootstrapModal>
      </Aux>
      {graphTableBody}
    </div>
  );
};

SurveyMaterialTable.propTypes = {
  paginatedRows: PropTypes.array.isRequired,
  maxPageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  tableHeadersArray: PropTypes.array.isRequired,
};

export default memo(SurveyMaterialTable);
