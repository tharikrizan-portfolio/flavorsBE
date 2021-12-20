import React from "react";
import { Row, Col, Breadcrumb, Pagination, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Aux from "../../hoc/_Aux";

const Profile = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.userData.firstName);
  const lastName = useSelector((state) => state.userData.lastName);
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>Profile</Card.Header>
            <Card.Body style={{ textAlign: "left" }}>
              <Card.Text>
                First Name <Card.Text> {firstName}</Card.Text>
              </Card.Text>
              <Card.Text>
                Last Name<Card.Text> {lastName}</Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default Profile;
