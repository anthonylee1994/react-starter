import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { actions } from "./actions";

interface IContainerProps {
  children?: JSX.Element;
  initialize?: () => void;
}

class Container extends React.Component<IContainerProps, any> {

  constructor(props: IContainerProps) {
    super(props);
    props.initialize();
  }

  public render() {

    const { } = this.props;

    return (
      <div />
    );
  }

}
export default function createElementWithId(componentId: string) {

  const mapStateToProps = (state: any) => ({
    componentId,
  });

  const mapDispatchToProps = (dispatch: any) => ({
    initialize: bindActionCreators(actions(componentId).initialize, dispatch),
    dispatch,
  });

  return connect<{}, {}, IContainerProps>(mapStateToProps, mapDispatchToProps)(Container);

}
