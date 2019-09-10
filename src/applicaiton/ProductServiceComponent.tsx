import * as React from "react";
import { Product } from "./../Product";
import { HttpService } from "../service";
import DynamicTableComponent from '../DynamicTableComponent';

export interface Props {
  text?: string;
  data?: Product;
  selectedData?: (prd: Product) => void;
}
interface IState {
  [key: string]: string;
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

class ProductServiceComponent extends React.Component<Props, State> {
  serv: HttpService;
  constructor(props: any) {
    super(props);
    this.serv = new HttpService();
  }
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

  componentDidMount = () => {
    this.loadHeaders();
    this.loadData();  
  };
  private loadData =() => {
    this.serv
      .getData()
      .then(resp => {
        const prds = resp.data;
        console.log(`In service Response ${JSON.stringify(prds)}`);
        this.setState({
          products: prds
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  private loadHeaders = () => {
    let product = new Product(0, "", "", "", "", "", 0);
    let tHeader: Array<string> = new Array<string>();
    for (let p in product) {
      tHeader.push(p);
    }
    this.setState({
      headers: tHeader
    });
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
  save = () => {
    let product = new Product(0, "", "", "", "", "", 0);
    product.ProductRowId = this.state.ProductRowId;
    product.ProductId = this.state.ProductId;
    product.ProductName = this.state.ProductName;
    product.Manufacturer = this.state.Manufacturer;
    product.CategoryName = this.state.CategoryName;
    product.Description = this.state.Description;
    product.BasePrice = this.state.BasePrice;
    console.log(`${this.state.canUpdate} + ${JSON.stringify(product)}`);
    if (!this.state.canUpdate) {
      this.serv
        .postData(product)
        .then(resp => {
          const prd = resp.data;
          console.log(`In service Response ${JSON.stringify(prd)}`);
          this.setState({ ProductRowId: prd.ProductRowId });
          this.setState({ ProductId: prd.ProductId });
          this.setState({ ProductName: prd.ProductName });
          this.setState({ Manufacturer: prd.Manufacturer });
          this.setState({ CategoryName: prd.CategoryName });
          this.setState({ Description: prd.Description });
          this.setState({ BasePrice: prd.BasePrice });
          let tempArray = this.state.products.slice();
          tempArray.push(prd);
          this.setState({
            products: tempArray
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.serv
        .putData(product.ProductRowId, product)
        .then(resp => {
          const prd = resp.data;
          console.log(`In service Response ${JSON.stringify(product)}`);
          this.setState({ ProductRowId: product.ProductRowId });
          this.setState({ ProductId: product.ProductId });
          this.setState({ ProductName: product.ProductName });
          this.setState({ Manufacturer: product.Manufacturer });
          this.setState({ CategoryName: product.CategoryName });
          this.setState({ Description: product.Description });
          this.setState({ BasePrice: product.BasePrice });
          this.loadData(); 
          this.setState({
            canUpdate: false
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            canUpdate: false
          });
        });
    }
  };
  getSelectedData = (prd: Product) => {
    this.setState({ canUpdate: true });
    this.setState({ ProductRowId: prd.ProductRowId });
    this.setState({ ProductId: prd.ProductId });
    this.setState({ ProductName: prd.ProductName });
    this.setState({ Manufacturer: prd.Manufacturer });
    this.setState({ CategoryName: prd.CategoryName });
    this.setState({ Description: prd.Description });
    this.setState({ BasePrice: prd.BasePrice });
  };
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
        <br />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {this.state.headers.map((v, i) => (
                <TableHeader key={i} text={v} />
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((v, i) => (
              <TableRows key={i} data={v} selectedData={this.getSelectedData} />
            ))}
          </tbody>
        </table>
        <hr/>
        
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

class TableHeader extends React.Component<Props, State> {
  static props: Props = {
    text: ""
  };
  render() {
    return <td>{this.props.text}</td>;
  }
}

class TableRows extends React.Component<Props, State> {
  static props: Props = {
    data: new Product(0, "", "", "", "", "", 0),
    selectedData: (prd: Product) => void {}
  };

  selectRow = () => {
    this.props.selectedData!(this.props.data!);
  };
  // using the xclamation mark (!) as a hint to the type checker that you know the value is going to be defined.
  render() {
    return (
      <tr onClick={this.selectRow}>
        <td>{this.props.data!.ProductRowId}</td>
        <td>{this.props.data!.ProductId}</td>
        <td>{this.props.data!.ProductName}</td>
        <td>{this.props.data!.CategoryName}</td>
        <td>{this.props.data!.Manufacturer}</td>
        <td>{this.props.data!.Description}</td>
        <td>{this.props.data!.BasePrice}</td>
      </tr>
    );
  }
}
export default ProductServiceComponent;