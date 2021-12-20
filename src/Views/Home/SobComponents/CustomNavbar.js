import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { AUTH_SIGN_IN_URL } from "../../../store/constant";

const CustomNavbar = ({}) => {
  return (
    <div>
      <Navbar style={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <Nav className="mr-auto">
          <Nav.Link href="#features">
            <h4>
              <strong>BConic Survey</strong>
            </h4>
          </Nav.Link>
        </Nav>
        <Nav className="mr-auto nav-link-font-size">
          <Nav.Link className="nav-link-margin" href="#features">
            <strong>Features</strong>
          </Nav.Link>
          <Nav.Link className="nav-link-margin" href="#pricing">
            <strong>Product</strong>
          </Nav.Link>
          <Nav.Link className="nav-link-margin" href="#pricing">
            <strong>Pricing</strong>
          </Nav.Link>
        </Nav>
        <Form inline>
          <Nav className="mr-auto nav-link-font-size">
            <Nav.Link className='nav-link-margin' href={AUTH_SIGN_IN_URL}>
              <strong>Sign in</strong>
            </Nav.Link>
            <Nav.Link className='nav-link-margin' href="/#/auth/signup">
              <strong>Sign up</strong>
            </Nav.Link>
          </Nav>
        </Form>
      </Navbar>
    </div>
  );
};

CustomNavbar.propTypes = {};

export default CustomNavbar;
