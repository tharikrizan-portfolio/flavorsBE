import React from "react";
import moment from "moment";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  deleteSurvey,
  getSurveyList,
  publishStatusChanged,
  viewSurvey,
} from "../../actions/survey.actions";
import helperUtil from "../../util/helper";
import { MDBIcon } from "mdbreact";
import IconButton from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Aux from "../../hoc/_Aux";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { closeAlert, openAlert } from "../../actions/alert.action";
import equal from "fast-deep-equal";
import { convertFromHTML } from "draft-js";
import { getSurveyQuestions } from "../../actions/updateQuestion.actions";

class Surveys extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      surveys: [],
      data: [],
      rows: [],
      open: false,
      setOpen: false,
      columns: [
        {
          label: "Title",
          field: "title",
          isSorted: false,
        },
        {
          label: "Type",
          field: "type",
          isSorted: false,
        },
        {
          label: "Start At",
          field: "startAt",
          isSorted: false,
        },
        {
          label: "End At",
          field: "endAt",
          isSorted: false,
        },
        {
          label: "Publish Status",
          field: "publishStatus",
          isSorted: false,
        },
        {
          label: "View",
          field: "view",
          isSorted: false,
        },
        {
          label: "Delete",
          field: "delete",
          isSorted: false,
        },
      ],
    };
  }

  async componentDidMount() {
    await this.props.onSurveyList(this.props.headers);
    await this.getSurveys();
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.surveys, prevProps.surveys)) {
      this.getSurveys();
    }
  }

  handleOpen = (id) => {
    this.setState(
      {
        id: id,
      },
      () => {
        this.props.openAlert();
      }
    );
  };

  sortRows = (rows, field, isAscOrder) => {
    if (isAscOrder) {
      rows.sort((a, b) => {
        if (field === "publishStatus") {
          return a.surveyPublishedStatus ? -1 : 1;
        }
        if (field === "endAt") {
          return moment(b["endDate"]).isAfter(moment(a["endDate"])) ? -1 : 1;
        }
        if (field === "startAt") {
          return moment(b["startDate"]).isAfter(moment(a["startDate"]))
            ? -1
            : 1;
        }
        const nameA = a[field].toUpperCase(); // ignore upper and lowercase
        const nameB = b[field].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });
    } else {
      rows.sort((a, b) => {
        if (field === "publishStatus") {
          return a.surveyPublishedStatus ? 1 : -1;
        }
        if (field === "endAt") {
          return moment(b["endDate"]).isAfter(moment(a["endDate"])) ? 1 : -1;
        }
        if (field === "startAt") {
          return moment(b["startDate"]).isAfter(moment(a["startDate"]))
            ? 1
            : -1;
        }
        const nameA = a[field].toUpperCase(); // ignore upper and lowercase
        const nameB = b[field].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      });
    }
  };

  handleSortColumn = (index, field, prevValue) => {
    let columns = this.state.columns;
    let rows = this.state.rows;
    columns = columns.map((column) => {
      return { ...column, isSorted: false };
    });
    columns[index].isSorted = !prevValue;
    this.sortRows(rows, field, !prevValue);
    this.setState({
      rows,
      columns,
    });
  };

  getSurveys = () => {
    var allFiledSurveys = [];
    for (let survey of this.props.surveys) {
      allFiledSurveys.push({
        title: convertFromHTML(survey.title).contentBlocks[0].text,
        surveyPublishedStatus: survey.isPublished,
        type: helperUtil.capitalizedFirstLetter(survey.type) || " ",
        url: survey.url || " ",
        startAt:
          new Date(survey.startAt).toDateString() +
            ": " +
            new Date(survey.startAt).toLocaleTimeString() || " ",
        endAt:
          new Date(survey.endAt).toDateString() +
            ": " +
            new Date(survey.endAt).toLocaleTimeString() || " ",
        startDate: survey.startAt,
        endDate: survey.endAt,
        publishStatus: (
          <Button
            outline
            variant={survey.isPublished ? "success" : "info"}
            size="sm"
            onClick={(e) => {
              this.props.onPublishStatusChanged(
                survey.surveyId,
                !survey.isPublished,
                this.props.headers
              );
            }}
            id={survey}
          >
            {survey.isPublished ? "Yes" : "No"}
          </Button>
        ),
        delete: (
          <Button
            outline
            variant="danger"
            size="sm"
            onClick={(e) => {
              this.handleOpen(survey.surveyId);
            }}
            id={survey}
          >
            <MDBIcon icon="trash-alt" />
          </Button>
        ),
        view: (
          <Button
            outline
            variant="success"
            size="sm"
            onClick={() => {
              this.props.viewSurvey(survey.surveyId, this.props.headers);
              this.props.viewSurveyQuestions(
                survey.surveyId,
                this.props.headers
              );
            }}
            id={survey}
          >
            {" "}
            <MDBIcon icon="eye" />{" "}
          </Button>
        ),
      });
    }
    this.setState({
      rows: allFiledSurveys,
    });
  };

  render() {
    return (
      <Aux>
        <Modal
          size="sm"
          show={this.props.open}
          onHide={() => this.props.closeAlert()}
          aria-labelledby="example-modal-sizes-title-sm"
          style={{ color: "black" }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              <b>Are you sure to delete survey?</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row float-right">
              <Button
                outline
                variant="danger"
                size="sm"
                onClick={() => {
                  this.props.onDeleteSurvey(this.state.id, this.props.headers);
                }}
              >
                Yes
              </Button>
              <Button
                outline
                variant="success"
                size="sm"
                onClick={this.props.closeAlert}
              >
                No
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Surveys</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      {this.state.columns &&
                        this.state.columns.map((col, index) => {
                          return (
                            <th key={index} className="color: black">
                              <strong>
                                {col.label}
                                {index < 5 && (
                                  <IconButton
                                    style={{
                                      outline: "none",
                                      maxHeight: "2px",
                                      maxWidth: "4px",
                                    }}
                                    onClick={() =>
                                      this.handleSortColumn(
                                        index,
                                        col.field,
                                        col.isSorted
                                      )
                                    }
                                  >
                                    {col.isSorted ? (
                                      <KeyboardArrowDownIcon
                                        fontSize="small"
                                        style={{ color: "#00966B" }}
                                      />
                                    ) : (
                                      <ExpandLessIcon
                                        fontSize="small"
                                        style={{ color: "grey" }}
                                      />
                                    )}
                                  </IconButton>
                                )}
                              </strong>
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rows &&
                      this.state.rows.map((row, index) => {
                        return (
                          <tr key={index}>
                            <td>{row.title}</td>
                            <td>{row.type}</td>
                            <td>{row.startAt}</td>
                            <td>{row.endAt}</td>
                            <td>{row.publishStatus}</td>
                            <td>{row.view}</td>
                            <td>{row.delete}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.errors || "",
    headers: state.userData.user.headers || "",
    surveys: state.surveyData.surveys || [],
    open: state.alertConfig.open,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSurveyList: (headers) => {
      dispatch(getSurveyList(headers));
    },
    onPublishStatusChanged: (surveyId, surveyStatus, headers) => {
      dispatch(publishStatusChanged(surveyId, surveyStatus, headers));
    },
    onDeleteSurvey: (surveyId, headers) => {
      // return new Promise(function(resolve, reject) {
      //     dispatch(deleteSurvey(surveyId, headers))
      //     resolve('test');
      //
      // })
      dispatch(deleteSurvey(surveyId, headers));
    },

    openAlert: () => {
      dispatch(openAlert());
    },
    closeAlert: () => {
      dispatch(closeAlert());
    },
    viewSurvey: (surveyId, headers) => {
      dispatch(viewSurvey(surveyId, headers));
    },
    viewSurveyQuestions: (surveyId, headers) => {
      dispatch(getSurveyQuestions(surveyId, headers));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys);
