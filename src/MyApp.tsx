import * as React from 'react';
interface Props {
    data?:string
}
interface State {
    message:string;
}

export default class MyComponent extends React.Component<Props, State> {
    
    state: State = {
        message:''
    };

    printMessage =()=> {
         this.setState({
            message: 'I am the First Button'
         });
    }

    newMessage = () =>{
        this.setState({
            message: 'I am the Second Button'
        });
    }
    render(){
        return (
            <div className="container">

                <input type="button" value="Click Me" className="btn btn-danger" onClick={this.printMessage}/>
                <hr/>
                <div className="container">
                    {this.state.message}
                    <hr/>
                    <ChildComponent data={this.state.message}/>  
                </div>
                <hr/>
                <input type="button" value="New Message" className="btn btn-warning" onClick={this.newMessage}/>
            </div>
        );
    }
}

class ChildComponent extends React.Component<Props, State> {
    static props: Props = {
        data:''
    }
    render(){
        return (
            <div className="container">
              {this.props.data}
            </div>
        );
    }
}