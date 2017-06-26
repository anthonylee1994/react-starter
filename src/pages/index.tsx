import * as React from "react";
const { Switch } = require("react-router-dom");
import { ConnectedRouter } from "react-router-redux";
import { history } from "../redux/store";

import App from "../components/App";

import AppRoute from "./App";
import NotFoundRoute from "./NotFound";

export const Router = (
    <ConnectedRouter history={history}>
        <App>
            <Switch>
                {AppRoute}
                {NotFoundRoute}
            </Switch>
        </App>
    </ConnectedRouter>
);
