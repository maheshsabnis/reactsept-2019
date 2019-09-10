import * as React from "react";
import { Component } from "react";
import { ProductData } from "../models/productmodel";

export interface Props {
  optValue?: string;
}

// the state Keys
// for databinding, the DOM element will be
// identified using these keys as name:value pair
export interface State {
  ProductRowId: number;
  ProductId: string;
  ProductName: string;
  Manufacturer: string;
  CategoryName: string;
  BasePrice: number;
  Manufacturers: Array<string>;
  Categories: Array<string>;
  Product: ProductData;
  Products: Array<ProductData>;
  headers: Array<string>;
  // the tuple that will read the 'name' attribute base keys matched with state keys
  // key: The name of the state key
  // any: is the type of the key
  [key: string]: any;
}

class ProductAppComponent extends React.Component<Props, State> {
  // the state instance type
  state: State = {
    ProductRowId: 0,
    ProductId: "",
    ProductName: "",
    Manufacturer: "",
    CategoryName: "",
    BasePrice: 0,
    Manufacturers: ["HP", "Bajaj", "Parle"],
    Categories: ["Electronics", "Electrical", "Food"],
    Product: new ProductData(0, "", "", "", "", 0),
    Products: new Array<ProductData>(),
    headers: new Array<string>()
  };
  clear = () => {
    this.setState({ ProductRowId: 0 });
    this.setState({ ProductId: "" });
    this.setState({ ProductName: "" });
    this.setState({ Manufacturer: "" });
    this.setState({ CategoryName: "" });
    this.setState({ BasePrice: 0 });
  };

  constructor(props:Props){
      super(props);
      this.loadHeaders();
  }
  // component Lifecycle method
  componentDidMount = () => {
   // this.loadHeaders();
  };

  // method to read propertis of Product object and push them in array
  loadHeaders = () => {
    for (let p in this.state.Product) {
      this.state.headers.push(p);
    }
  };

  // common change method for all editable elements
  handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // reading name of the element
    const name = evt.target.name as string;
    // the State Object that will be used to read new Value default is empty
    const newValue: Partial<State> = {};
    // set the new value based on value entered in target element
    newValue[name] = evt.target.value;
    // finally set state
    this.setState(newValue);
  };

  save = () => {

  };
  render() {
    return (
      <div className="container">
        <h2>The Product Component</h2>
        <div className="form-group">
          <label htmlFor="ProductRowId">ProductRowId</label>
          <input
            type="text"
            name="ProductRowId"
            className="form-control"
            value={this.state.ProductRowId}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductId">ProductId</label>
          <input
            type="text"
            name="ProductId"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.ProductId}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">ProductName</label>
          <input
            type="text"
            name="ProductName"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.ProductName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Manufacturer">Manufacturer</label>
          <select
            className="form-control"
            onChange={this.handleChange}
            name="Manufacturer"
            value={this.state.Manufacturer}
          >
            <option>Select Manufacturer</option>
            {this.state.Manufacturers.map((v, i) => (
              <OptionComponent key={i} optValue={v} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="CategoryName">CategoryName</label>
          <select
            className="form-control"
            onChange={this.handleChange}
            name="CategoryName"
            value={this.state.CategoryName}
          >
            <option>Select Category</option>
            {this.state.Categories.map((v, i) => (
              <OptionComponent key={i} optValue={v} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="BasePrice">BasePrice</label>
          <input
            type="text"
            name="BasePrice"
            onChange={this.handleChange}
            className="form-control"
            value={this.state.BasePrice}
          />
        </div>
        <div className="form-group">
          <input
            type="button"
            value="Clear"
            onClick={this.clear}
            className="btn btn-warning"
          />
          <input
            type="button"
            value="Save"
            onClick={this.save}
            className="btn btn-success"
          />
        </div>
        <hr />
        <table className="table table-bordered table-striped">
          <thead>
                <tr>
                   {
                       this.state.headers.map((v,i) => (
                           <td key={i}>{v}</td>
                       ))
                   }
                </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

// define an OptionComponent for Reusability
class OptionComponent extends React.Component<Props, State> {
  render() {
    return <option value={this.props.optValue}>{this.props.optValue}</option>;
  }
}

export default ProductAppComponent;
