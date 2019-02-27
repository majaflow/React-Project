import React,{Component} from 'react'
import Enemy from './Monsters/Enemy/Enemy'
import APIURL from '../../helpers/enviroment'
export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameOfMonster: ''
        }
    }
    whereMyMonster = (event) => {
        event.preventDefault()
        fetch(`${APIURL}/monster/${this.state.nameOfMonster}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'authorization': this.props.token
            }
        })
        .then(res=>res.json())
        .then(json=> {
         let monster = json
        return <Enemy monster= {monster}/>  
         })
        }
        handleChange = (event) => {
            console.log(this.state)
            this.setState({[event.target.id]: event.target.value})
          }
        
        render(){
            return (
                <form className="searchForm" onSubmit={this.whereMyMonster}>
                <label htmlFor="nameOfMonster">Search Name:</label> 
                <input onChange={this.handleChange} value={this.state.nameOfMonster} type="text" id="nameOfMonster" />
                <button type="submit">Search</button>
                </form>
                )
            }
        }
    
