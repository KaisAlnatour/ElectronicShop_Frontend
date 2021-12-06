import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

import routes from "routes.js";
function LoginPage() {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/user") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    return (
        <BackgroundColorContext.Consumer>
            {({ color, changeColor }) => (
                <React.Fragment>
                    <Switch>
                        {getRoutes(routes)}
                        <Redirect from="*" to="/user/login" />
                    </Switch>
                </React.Fragment>
            )}
        </BackgroundColorContext.Consumer>
    );
}
export default LoginPage;
