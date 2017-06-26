import * as React from "react";
import { connect } from "react-redux";
import * as Router from "react-router";
import { selectPathName } from "../../redux/modules/router/selectors";
import { isAuthenticated } from "../../redux/modules/user/selectors";

const r: any = Router;
const { Link } = r;

interface IAppContrainerProps {
    children?: JSX.Element;
    currentPath?: string;
    isAuthenticated?: boolean;
}

class AppContainer extends React.Component<IAppContrainerProps, undefined> {
    public render() {
        const { isAuthenticated, currentPath } = this.props;
        return (
            <div />
        );
    }
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: isAuthenticated(state),
    currentPath: selectPathName(state),
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect<{}, {}, IAppContrainerProps>(mapStateToProps, mapDispatchToProps)(AppContainer);
