import React, { memo, useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import './DashboardTable.css';
import moment from 'moment';
import { convertHTMLTagToInnerText } from '../../../../src/util/helper';
import helper from '../../../../src/util/helper';
import {
  deleteSurvey,
  getSurveyResponses,
  getSurveyResponsesGraphical,
  viewSurveyFromDashboard,
} from '../../../actions/survey.actions';
import { IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCircularProgress from '../../../../src/Views/components/common/Loader/MaterialCircularProgress';
import CsvDownloader from 'react-csv-downloader';
import Aux from '../../../../src/hoc/_Aux/index';
import GetAppIcon from '@material-ui/icons/GetApp';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Tooltip,
  Button,
} from '@material-ui/core';
import {
  ArrowBack,
  ExpandLess,
  Edit,
  Delete,
  Equalizer,
  KeyboardArrowDown,
  GetApp,
} from '@material-ui/icons';
import ResponseView from '../../../Views/SurveyOverview/SurveyResponseGraphSubComponents/ResponseView';
import SurveyResponseFilterDashboard from '../../components/common/SurveyResponseFilter/SurveyResponseFilterDashboard';
import CreateFormBtn from '../CreateFormBtn';
import AlertDialog from '../../components/common/AlertDialog/AlertDialog';
import SimpleDialog from '../../components/common/AlertDialog/SimpleDialog';
import ImgSheets from '../../Dashboard/formTypeImages/Survey1.svg';
import ImgQuiz from '../../Dashboard/formTypeImages/Quiz1.svg';
import GraphicalView from './GraphicalView';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',

      color: theme.palette.darkHeader,
      backgroundColor: '#edf0f7',
    },
    '& tbody td': {},
    '& tbody tr:hover': {
      backgroundColor: theme.palette.hoverColor,
    },
  },
}));

const SurveyDataTable = ({ paginatedRows, maxPageCount, onPageChange, tableHeadersArray }) => {
  const dispatch = useDispatch();
  const surveys_ = useSelector((state) => state.surveyData.surveyListForTable?.data || []);
  const headers = useSelector((state) => state.userData?.user?.headers || '');
  const csvObject = useSelector((state) => state.surveyData?.csvObject || {});
  const chartOptionList = useSelector((state) => state.surveyData?.chartOptionList?.data || []);
  const isFetching = useSelector((state) => state.surveyData?.chartOptionList?.fetching || false);

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

  const [Id, setId] = useState('');
  const [isDownloadModelOpen, setIsDownloadModelOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGraphViewAlert, setOpenGraphViewAlert] = useState(false);

  const getResponseCount = (questions) => {
    return questions?.reduce((max, question) => Math.max(question?.answerCount, max), 0).toString();
  };

  const classes = useStyles();

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const onSelectSurvey = async (surveyId) => {
    const selectedSurvey_ = paginatedRows.filter((survey) => survey.surveyId === surveyId);
    setState({
      ...state,
      selectedSurvey: selectedSurvey_[0],
    });
    dispatch(getSurveyResponsesGraphical(surveyId, headers));
  };

  const handleViewAll = () => {
    const isAccordionExpanded = state.accordionList.find((value) => value);
    setState({
      ...state,
      accordionList: [...state.accordionList.map(() => !isAccordionExpanded)],
      isAllExpanded: !isAccordionExpanded,
    });
  };

  const dataRows =
    paginatedRows?.map((survey) => (
      <TableRow key={survey.surveyId}>
        <TableCell>
          <img
            src={survey?.type === 'QUIZ' ? ImgQuiz : ImgSheets}
            style={{
              width: '25px',
              height: '25px',
            }}
          />
        </TableCell>
        <TableCell>{convertHTMLTagToInnerText(survey.title)}</TableCell>
        <TableCell align="center">{getResponseCount(survey.questions)}</TableCell>
        <TableCell align="center">{survey.questions?.length}</TableCell>
        <TableCell>{moment(survey.createdAt).format('MMMM Do, YYYY')}</TableCell>
        <TableCell>
          {survey.isActive ? (
            <span class="badge badge-success">Active</span>
          ) : (
            <span class="badge badge-danger">In Active</span>
          )}{' '}
          {survey.isPublished ? (
            <span class="badge badge-success">Published</span>
          ) : (
            <span class="badge badge-danger">Not published</span>
          )}
        </TableCell>
        <TableCell>
          <Tooltip title="Download Survey">
            <IconButton
              onClick={() => {
                dispatch(
                  getSurveyResponses({ surveyId: survey.surveyId, title: survey.title }, headers),
                );
                setIsDownloadModelOpen(true);
              }}
            >
              <GetApp fontSize="small" className={classes.icon} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Statistics">
            <IconButton
              onClick={() =>
                getResponseCount(survey.questions) > 0
                  ? onSelectSurvey(survey.surveyId)
                  : setOpenGraphViewAlert(true)
              }
            >
              <Equalizer fontSize="small" className={classes.icon} />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Delete Survey">
            <IconButton
              onClick={(e) => {
                handleOpen(survey.surveyId);
              }}
              id={survey}
            >
              <Delete fontSize="small" className={classes.icon} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Update Survey">
            <IconButton
              onClick={() => {
                dispatch(viewSurveyFromDashboard(survey.surveyId, headers));
              }}
              id={survey}
            >
              {' '}
              <Edit fontSize="small" className={classes.icon} />{' '}
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    )) || [];

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
                      <div className="flex-space-between">
                        <SurveyResponseFilterDashboard />
                        <CreateFormBtn />
                      </div>

                      {paginatedRows ? (
                        <>
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
                        </>
                      ) : (
                        <div className="graphical-view-loader">
                          <b>No data</b>
                        </div>
                      )}
                    </div>
                  ) : isFetching ? (
                    <div className="graphical-view-loader">
                      <MaterialCircularProgress />
                    </div>
                  ) : (
                    <>
                      {state.selectedSurvey && chartOptionList && (
                        <GraphicalView
                          onBack={() =>
                            setState({
                              ...state,
                              selectedSurvey: null,
                            })
                          }
                          selectedSurvey={state.selectedSurvey}
                          chartOptionList={chartOptionList}
                        />
                      )}
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
      <SimpleDialog
        open={openGraphViewAlert}
        handleClose={() => setOpenGraphViewAlert(false)}
        title="No Responses"
        description="you don't have any responses yet to view statistics."
      />
      <Aux>
        <SimpleDialog
          open={isDownloadModelOpen}
          handleClose={() => setIsDownloadModelOpen(false)}
          title="Download CSV"
          description={
            csvObject?.csv?.fetching
              ? `Initializing download`
              : csvObject?.csv?.data
              ? `Survey: ${helper.convertHtmlTextToString(csvObject.title)}`
              : csvObject?.csv?.message
          }
        >
          <div style={{ textAlign: 'center' }}>
            {csvObject?.csv?.fetching ? (
              <div style={{ margin: 'auto', paddingRight: '10px' }}>
                <MaterialCircularProgress size={28} />
              </div>
            ) : (
              csvObject?.csv?.data && (
                <CsvDownloader
                  filename={helper.convertHtmlTextToString(csvObject.title) || ''}
                  separator=","
                  noHeader={false}
                  columns={csvObject.csv?.csvColumns || ''}
                  datas={csvObject.csv?.csvRows || ''}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setIsDownloadModelOpen(false)}
                  >
                    Download
                    <GetAppIcon fontSize="medium" color="primary" />
                  </Button>
                </CsvDownloader>
              )
            )}
          </div>
        </SimpleDialog>
      </Aux>
      <Aux>
        <AlertDialog
          open={open}
          handleClose={() => setOpen(false)}
          handleOk={() => dispatch(deleteSurvey(Id, headers, surveys_))}
          title="Delete Confirmation"
          description="Are you sure you want to delete this record ?"
        />
      </Aux>
      {graphTableBody}
    </div>
  );
};

SurveyDataTable.propTypes = {
  paginatedRows: PropTypes.array.isRequired,
  maxPageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  tableHeadersArray: PropTypes.array.isRequired,
};

export default memo(SurveyDataTable);
