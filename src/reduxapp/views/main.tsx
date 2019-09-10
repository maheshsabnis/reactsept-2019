import * as React from "react";
import CreateProductComponent from "./createproduct";
import ListProductsComponent from "./listproducts";
import { connect } from "react-redux";
import { actionFetchProducts } from "../actions/index";
import { ApplicationState } from "../reducers/index";

export interface Props {
   loadRecords: () => void;
  records?: Array<any>;
  state?: string;
  errorMessage?: string;
}

export interface State {}

class MainComponent extends React.Component<Props, State> {
//   state: State = {
//     records: [],
//     state: "",
//     errorMessage: ""
//   };
  componentDidMount = () => {
    if (this.props.state === "INIT") {
      this.props.loadRecords();
    }
  };
  render() {
    return (
      <div className="container">
        <CreateProductComponent />
        <hr />
        {this.renderView()}
      </div>
    );
  }

  renderView = () => {
    if (this.props.state === "LOADING") {
      return <p className="alert alert-warning">LOADING.......</p>;
    } else if (this.props.state === "ERROR") {
      return <p className="alert alert-danger">LOADING.......</p>;
    } else if (this.props.state === "LOADED") {
      return <ListProductsComponent data={this.props.records} />;
    } else {
      return "Init State";
    }
  };
}
const mapStateToProps = (state: ApplicationState, selfProps: Props) => {
  return {
    records: [],
    state: "INIT",
    errorMessage: ""
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadRecords: () => dispatch(actionFetchProducts())
  };
};

export default connect(
  mapStateToProps
  ,
mapDispatchToProps
)(MainComponent);
// export default MainComponent;
