import React, {Component} from 'react'
export default class Update extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: null,
            body: null
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props.id)
        if (this.state !== nextProps) {
            this.setState({
                id: nextProps.id,
                body: nextProps.body
            })
        }
        console.log(this.state)
    }  

    render(){
        return (<div>
            <button onClick={this.updateMonster}>Update</button>
            <button onClick={this.deleteMonster}>Delete</button>
            </div>
        )
    }
}