import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { actions } from "./actions";
import { isAppMenuOpen } from "./selectors";

import { AppBar, Drawer, ListItem } from "material-ui";

interface IMenuItem {
    title: string;
    url?: string;
    menuItems?: IMenuItem[];
    leftIcon?: any;
}

interface IContainerProps {
    children?: JSX.Element;
    initialize?: () => void;
    openAppMenu?: () => void;
    closeAppMenu?: () => void;
    isAppMenuOpen?: boolean;
    dispatch?: any;

    title: string;
    menuItems: IMenuItem[];
}

class MaterialLayout extends React.Component<IContainerProps, any> {

    public docked = false;

    constructor(props: IContainerProps) {
        super(props);
        props.initialize();
    }

    public handleAppMenuToggle = () => {
        if (this.props.isAppMenuOpen) {
            this.props.closeAppMenu();
        } else {
            this.props.openAppMenu();
        }
    }

    public handleMenuRequestChange = (open: boolean) => {
        if (open) {
            this.props.openAppMenu();
        } else {
            this.props.closeAppMenu();
        }
    }

    public windowResizeEvent = () => {
        if (window.innerWidth > 767) {
            this.docked = true;
        } else {
            this.docked = false;
        }
        this.forceUpdate();
    }

    public componentWillMount() {
        this.windowResizeEvent();
        window.onresize = this.windowResizeEvent;
    }

    public render() {

        const { closeAppMenu, openAppMenu, isAppMenuOpen, title, menuItems } = this.props;

        return (
            <div>
                <AppBar
                    title={title}
                    onLeftIconButtonTouchTap={this.handleAppMenuToggle}
                />
                <Drawer
                    docked={this.docked}
                    width={300}
                    open={this.docked || isAppMenuOpen}
                    onRequestChange={this.handleMenuRequestChange}
                >
                    <AppBar
                        title={title}
                        onLeftIconButtonTouchTap={this.handleAppMenuToggle}
                        zDepth={0}
                        showMenuIconButton={false}
                    />
                    {(menuItems) ? menuItems.map((item, key) => {
                        return (
                            <ListItem
                                key={key}
                                onClick={() => {
                                    if (!item.menuItems) {
                                        if (!this.docked) {
                                            closeAppMenu();
                                        }
                                        this.props.dispatch(push(item.url));
                                    }
                                }}
                                primaryTogglesNestedList={true}
                                nestedItems={(() => {
                                    if (item.menuItems) {
                                        return item.menuItems.map((subItem, subKey) => {
                                            return (
                                                <ListItem
                                                    key={subKey}
                                                    leftIcon={subItem.leftIcon}
                                                    onClick={() => {
                                                        if (!this.docked) {
                                                            closeAppMenu();
                                                        }
                                                        this.props.dispatch(push(subItem.url));
                                                    }}
                                                    primaryText={subItem.title}
                                                />
                                            );
                                        });
                                    } else {
                                        return null;
                                    }
                                })()}
                                leftIcon={item.leftIcon}
                                primaryText={item.title}
                            />
                        );
                    }) : null}
                </Drawer>
            </div>
        );
    }

}
export default function createElementWithId(componentId: string) {

    const mapStateToProps = (state: any) => ({
        componentId,
        isAppMenuOpen: isAppMenuOpen(state, componentId),
    });

    const mapDispatchToProps = (dispatch: any) => ({
        initialize: bindActionCreators(actions(componentId).initialize, dispatch),
        openAppMenu: bindActionCreators(actions(componentId).openAppMenu, dispatch),
        closeAppMenu: bindActionCreators(actions(componentId).closeAppMenu, dispatch),
        dispatch,
    });

    return connect<{}, {}, IContainerProps>(mapStateToProps, mapDispatchToProps)(MaterialLayout);

}
