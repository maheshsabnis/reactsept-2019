import * as React from "react";
interface Props {}
interface State {
  UserName: string;
  Password: string;
  isUserNameValid: boolean;
  isPasswordValid: boolean;
  ErrorMessageUserName: string;
  ErrorMessagePassword: string;
  canSubmit: boolean;
  [key: string]: any;
}

class ValiationComponent extends React.Component<Props, State> {
  state: State = {
    UserName: "",
    Password: "",
    isUserNameValid: true,
    isPasswordValid: true,
    ErrorMessageUserName: "",
    ErrorMessagePassword: "",
    canSubmit: true
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as string;
    const newValue: Partial<State> = {};
    newValue[name] = e.target.value;
    this.setState(newValue);
    this.validateInputs(name, e.target.value);
  };

  private validateInputs = (name: string, value: string) => {
    console.log(`name ${name} value ${value}`);
    if (name == "UserName") {
      if (value.length <= 0 || value === "") {
        this.setState({ isUserNameValid: false });
        this.setState({ ErrorMessageUserName: "User Name is Mandatory" });
        this.setState({ canSubmit: false });
      } else {
        this.setState({ isUserNameValid: true });
        this.setState({ ErrorMessageUserName: "" });
      }
    }

    if (name == "Password") {
      if (value.length <= 0 || value.length > 15) {
        this.setState({ isPasswordValid: false });
        this.setState({
          ErrorMessagePassword: "Password is Must less that 15 characters"
        });
        this.setState({ canSubmit: false });
      } else {
        this.setState({ isPasswordValid: true });
        this.setState({ ErrorMessagePassword: "" });
      }
      if(!this.state.isUserNameValid || !this.state.isPasswordValid){
          this.setState({canSubmit:false});
      }else{
        this.setState({canSubmit:true});
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="UserName">User Name</label>
          <input
            name="UserName"
            type="text"
            value={this.state.UserName}
            onChange={this.handleChange}
            className="form-control"
          />
          <div
            className="alert alert-danger"
            hidden={this.state.isUserNameValid}
          >
            {this.state.ErrorMessageUserName}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            name="Password"
            type="password"
            value={this.state.Password}
            onChange={this.handleChange}
            className="form-control"
          />
          <div
            className="alert alert-danger"
            hidden={this.state.isPasswordValid}
          >
            {this.state.ErrorMessagePassword}
          </div>
        </div>
        <div className="form-group">
          <input type="button" className="btn btn-warning" value="Clear" />
          <input type="button" className="btn btn-success" value="Login" 
           disabled={!this.state.canSubmit}/>
        </div>
      </div>
    );
  }
}

export default ValiationComponent;
