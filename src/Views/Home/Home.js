import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./home.css";
import '../../assets/scss/style.scss';

import CustomNavbar from "./SobComponents/CustomNavbar";

const Home = (props) => {
  return (
    <>
      <CustomNavbar />

      <div style={{}}>
        <div
          className="nav-bar-color"
          style={{
            width: "100%",
            overflow: "hidden",
            textAlign: "center",
            alignItems: "center",
            padding: "40px",
            paddingTop: "20vh",
            height: "90vh",
            color: "white",
          }}
        >
          <div>
            <h2>
              <strong> Quick, easy & Impactful forms created by you </strong>
            </h2>
            <h3>
              <strong>
                {
                  "<BConic Survey> helps you create quick, easy to use forms and surveys giving you and your business the peace of mind to focus on your core activities"
                }
              </strong>
            </h3>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column">
        <footer class="footer">
          <div>
            <a href="https://halflife.io">Halflife</a>
            <span>&copy; 2021 Halflife.</span>
          </div>
        </footer>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
