import * as React from 'react';
export interface Props {
    message?:string
    data:Array<any>
}
 
export interface State {
    
}
 
class DynamicTableComponent extends React.Component<Props, State> {
    render() { 
        let headers:Array<string> = new Array<string>();
        if(this.props.data.length > 0){
            for(let p in this.props.data[0]){
                headers.push(p);
            }
        }
        return ( <div className="container">
          <h1>Generating Table Dynamically</h1>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
               {
                   headers.map((h,i) => (
                       <td key={i}>{h}</td>
                   ))
               }
              </tr>
            </thead>
            <tbody>
              {
                  this.props.data.map((p,i)=>(
                      <tr key={i}>
                        {
                            headers.map((h,j) => (
                                <td key={j}>{p[h]}</td>
                            ))
                        }
                      </tr>
                  ))
              }
            </tbody>
          </table>  
        </div> );
    }
}
 
export default DynamicTableComponent;