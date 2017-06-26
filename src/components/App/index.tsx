import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import "../../stylesheets/main.scss";

injectTapEventPlugin();

interface IAppProps {
    children?: any;
}

// app component
export default (props: IAppProps) => {
    return (
        <MuiThemeProvider>
            <div>
                {props.children}
            </div>
        </MuiThemeProvider>
    );
};
