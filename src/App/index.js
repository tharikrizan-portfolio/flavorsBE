import React, { Component, Suspense } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Loadable from "react-loadable";
import "react-toastify/dist/ReactToastify.css";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import { connect } from "react-redux";
import Loader from "./layout/Loader";
import queryString from "query-string";
import { userLogin } from "../actions/user.actions";
import { ProtectedRoute } from "./protectedRoute";
import { ToastContainer } from "react-toastify";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});
const PreviewSurvey = React.lazy(() => import("../Views/PreviewSurvey/Survey"));
const SignUp = Loadable({
  loader: () => import("../Views/Authentication/SignUp/SignUp"),
  loading: Loader,
});
const Home = Loadable({
  loader: () => import("../Views/Home/Home"),
  loading: Loader,
});

class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
    if (window.location.pathname === "/redirect") {
      const queryObj = queryString.parse(window.location.search);
      if (
        Object.hasOwnProperty.bind(queryObj)("state") &&
        Object.hasOwnProperty.bind(queryObj)("token")
      ) {
        userLogin(queryObj.token, queryObj.state);
        await this.props.onLogin(queryObj.token, queryObj.state);
        window.history.pushState({}, null, "/");
      }
    }
  }
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/auth/signup" component={SignUp} />
            <Route path="/preview/:id/:type" component={PreviewSurvey} />
            <Route path="/home" component={Home} />
            <ProtectedRoute
              path="/"
              name="Home"
              component={AdminLayout}
              token={this.props.user.token}
            />
          </Switch>
          <ToastContainer />
        </React.Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token, state) => {
      dispatch(userLogin(token, state));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
