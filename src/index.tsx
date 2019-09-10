import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyApp from './MyApp';
import ProductComponent from './ProductComponent';
// importing all the css or styles from bootstrap
import 'bootstrap/dist/css/bootstrap.css';

import * as serviceWorker from './serviceWorker';
import DynamicTableComponent from './DynamicTableComponent';
import ValiationComponent from './validations';
import ProductServiceComponent from './applicaiton/ProductServiceComponent';
import ProductAppComponent from './productmodule/components/productappcomponent';



 

interface Props {
    message:string
}
let msg = 'I am Comming From Parent';
let prds = [{ProductId:101,ProductName:'A'},{ProductId:102,ProductName:'B'}];
let emps =[{EmpNo:201, EmpName:'ABC',Salary:12000},{EmpNo:202, EmpName:'PQR',Salary:22000}]
 ReactDOM.render(<ValiationComponent/>, document.getElementById('root'));


// ReactDOM.render(<div>
//     <DynamicTableComponent data={emps}/>
//     <hr/>
//     <DynamicTableComponent data={prds}/>
//     </div> , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
