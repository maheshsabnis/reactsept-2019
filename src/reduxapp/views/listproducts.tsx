import React, { Component } from 'react';
import DynamicTableComponent from '../../DynamicTableComponent';
export interface Props {
    data?:Array<any>  
}
 
export interface State {
    records:Array<any>
}
 
class ListProductsComponent  extends Component<Props, State> {
    state:State = {
        records:[]
    } 
    render() { 
        return (
            <div className="container">
                <DynamicTableComponent data={this.state.records}/>
            </div>
        );
    }
}
 
export default ListProductsComponent;