import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import IFrameTabComponent from "./IFrameTabComponent";
import LinkTabComponent from "./LinkTabComponent";
import PropTypes from "prop-types";

const PublishedSurveyComponent = (allProps) => {
  const props = allProps.parentProps;
  const styles = allProps.styles;
  const fromParentState = allProps.parentState;
  return (
    <Card>
      <Card.Header>
        <h5>Sharing</h5>
        <hr />
        <Tab.Container defaultActiveKey="link">
          <Row>
            <Col sm={12}>
              <Tabs variant="pills" defaultActiveKey="link" className="mb-3">
                <Tab eventKey="link" title="link">
                  <LinkTabComponent
                    isPublished={props.isPublished}
                    surveyLink={allProps.surveyLink}
                  />
                </Tab>
                <Tab eventKey="iframe" title="iframe">
                  <IFrameTabComponent
                    styles={styles}
                    props={props}
                    fromParentState={fromParentState}
                    allProps={allProps}
                    commonEventHandler={allProps.commonEventHandler}
                  />
                </Tab>
              </Tabs>
            </Col>
          </Row>
          <br />
        </Tab.Container>
      </Card.Header>
    </Card>
  );
};

PublishedSurveyComponent.propTypes = {
  parentProps: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  parentState: PropTypes.object.isRequired,
};

export default PublishedSurveyComponent;
