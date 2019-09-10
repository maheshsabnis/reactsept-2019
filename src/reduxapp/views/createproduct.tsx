import * as React from "react";
import { Product } from "../../Product";

export interface Props {
    text?:string
}

export interface State {
  ProductRowId: number;
  ProductId: string;
  ProductName: string;
  Manufacturer: string;
  CategoryName: string;
  Description: string;
  BasePrice: number;
  products: Array<Product>;
  product: Product;
  headers: Array<string>;
  manufacturers: Array<string>;
  categories: Array<string>;
  canUpdate: boolean;
  [key: string]: any; // defining the key, an indexer that will be used to set state for all states using a name:value pair of the HTML input elements
}
class CreateProductComponent extends React.Component<Props, State> {
  state: State = {
    ProductRowId: 0,
    ProductId: "",
    ProductName: "",
    Manufacturer: "",
    CategoryName: "",
    Description: "",
    BasePrice: 0,
    manufacturers: ["Bajaj", "HP", "Parle"],
    categories: ["Electronics", "Electrical", "Food"],
    products: new Array<Product>(),
    product: new Product(0, "", "", "", "", "", 0),
    headers: new Array<string>(),
    canUpdate: false
  };

  clear = () => {
    this.setState({ ProductRowId: 0 });
    this.setState({ ProductId: "" });
    this.setState({ ProductName: "" });
    this.setState({ Manufacturer: "" });
    this.setState({ CategoryName: "" });
    this.setState({ Description: "" });
    this.setState({ BasePrice: 0 });
  };

  handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name as string;
    const newValue: Partial<State> = {};
    newValue[name] = e.target.value;
    this.setState(newValue);
  };
  save =()=>{}
  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="ProductRowId">ProductRowId</label>
          <input
            type="text"
            name="ProductRowId"
            disabled
            value={this.state.ProductRowId}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductId">ProductId</label>
          <input
            type="text"
            value={this.state.ProductId}
            name="ProductId"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductNane">ProductName</label>
          <input
            type="text"
            value={this.state.ProductName}
            name="ProductName"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="CategoryName">CategoryName</label>
          <select
            className="form-control"
            value={this.state.CategoryName}
            name="CategoryName"
            onChange={this.handleChange}
          >
            <option>Select CategoryName</option>
            {this.state.categories.map((v, i) => (
              <OptionsComponent key={i} text={v} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Manufacturer">Manufacturer</label>
          <select
            className="form-control"
            value={this.state.Manufacturer}
            name="Manufacturer"
            onChange={this.handleChange}
          >
            <option>Select Manufacturer</option>
            {this.state.manufacturers.map((v, i) => (
              <OptionsComponent key={i} text={v} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            value={this.state.Description}
            name="Description"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="BasePrice">BasePrice</label>
          <input
            type="text"
            value={this.state.BasePrice}
            name="BasePrice"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="button"
            onClick={this.clear}
            value="Clear"
            className="btn btn-warning"
          />
          <input
            type="button"
            value="Save"
            onClick={this.save}
            className="btn btn-success"
          />
        </div>
      </div>
    );
  }
}
class OptionsComponent extends React.Component<Props, State> {
    static props: Props = {
      text: ""
    };
    render() {
      return <option value={this.props.text}>{this.props.text}</option>;
    }
  }

export default CreateProductComponent;
