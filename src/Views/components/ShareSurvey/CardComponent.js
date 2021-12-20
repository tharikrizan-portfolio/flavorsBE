import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import SurveyDates from '../common/SurveyDates/SurveyDates';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialCircularProgress from '../common/Loader/MaterialCircularProgress';

const CardComponent = (props) => {
  return (
    <div className="rounded-card">
      <h5>{props.cardHeaderTitle || 'Share Survey'}</h5>
      <hr />
      <SurveyDates isAddSurvey={props.isAddSurvey} />
      <Row style={{ display: 'flex' }}>
        <Col sm={11} style={{ paddingRight: '0px' }}>
          <FormGroup>
            <FormControlLabel
              control={
                props.isLoader ? (
                  <MaterialCircularProgress size={30} />
                ) : (
                  <Switch checked={props.checked} onChange={props.onChange} />
                )
              }
              label={props.formControlLable || 'Publish survey'}
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

CardComponent.propTypes = {
  checked: PropTypes.any,
  onChange: PropTypes.func,
};

export default CardComponent;
