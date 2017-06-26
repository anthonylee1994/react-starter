import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router} from "./pages";
import {store} from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        {Router}
    </Provider>,
    document.getElementById("app"),
);
