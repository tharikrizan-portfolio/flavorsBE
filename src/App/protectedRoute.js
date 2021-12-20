import React, { useState } from 'react';

import { Route, Redirect, HashRouter } from 'react-router-dom';
import UserLeaveConfirmation from '../Views/SurveyManagement/UserLeaveConfirmation';

export const ProtectedRoute = ({ token: token, component: Component, ...rest }) => {
    const [open, setOpen] = useState(true)
    return (
        <HashRouter getUserConfirmation={(message, callback) => {
          return UserLeaveConfirmation(
            message,
            callback,
            open,
            setOpen
          );
        }}>
            <Route
                {...rest}
                render={
                    (props) => {
                        if (token) {
                            return <Component {...props} />
                        }
                        else {
                            return <Redirect from={props.location} to="/home" />
                        }
                    }

                }
            />
        </HashRouter>
    );
}