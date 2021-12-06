
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
// import RTLLayout from "layouts/RTL/RTL.js";
import Login from "layouts/public/log-in.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "antd/dist/antd.css";
import 'antd/dist/antd.less';
import 'react-toastify/dist/ReactToastify.css';
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
          <Route path="/user" render={(props) => <Login {...props} />} />
          <Redirect from="/" to="/admin" />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);