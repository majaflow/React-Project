import React, {Component} from 'react'
import Edit from './update'
export default class Create extends Component {
    constructor(props) {
     super(props);
     this.state= {
        nameOfMonster: 'Lay-Z',
        info: 'lazy',
        tier: 1,
        imgUrl:'lazy',
        affiliation: null,
        recruitTrigger: null,
        isBoss: false,
        
     }
    }
    submitMonster = (event) => {
        
        console.log(this.props.token)
        event.preventDefault()
       fetch(`${this.props.baseUrl}/monster/`,{
           method: 'POST',
           body: JSON.stringify(this.state),
           headers: {
            'Content-Type': 'application/json',
            'Authorization': this.props.token
           }
         })
         .then(res=>res.json())
         .then(json=>{
             console.log(json)
            })
            .catch(err => console.log(err.message))
        }
        handleChange = (event) => {
            console.log(this.state)
            this.setState({[event.target.id]: event.target.value})
          }
        deleteMonster = (event) => {
            event.preventDefault()
            fetch(`${this.props.baseUrl}/monster/${this.state.nameOfMonster}`,{
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': this.props.token
                }
              })
              .then(res=>res.json())
              .then(json=> console.log(json))
              .catch(err => err.message)
        }
        updateMonster = (event) => {
            event.preventDefault()
            fetch(`${this.props.baseUrl}/monster/${this.state.nameOfMonster}`,{
                method: 'PUT',
                body:JSON.stringify(this.state),
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': this.props.token
                }
              }).then(res=>res.json())
              .then(json=>console.log(json))
        }

    render() {
        return(
            <React.Fragment>
            <form className="cardLike" onSubmit={this.submitMonster}>
            <h1>Create Character</h1>
            <label htmlFor="nameOfMonster">Character Name:</label><br/>
            <input onChange={this.handleChange} value={this.state.nameOfMonster} type="text" id="nameOfMonster" /><br/>
            <label htmlFor="imgUrl">Charater ImgUrl</label><br/>
            <input onChange={this.handleChange} value={this.state.imgUrl} type="text" id="imgUrl" /><br/>
            <label htmlFor="info">Character Info</label><br/>
            <input onChange={this.handleChange} value={this.state.info} type="text" id="info" /> <br/>
            <button type="submit">Submit Character Data</button>
          </form>
          <button onClick={this.updateMonster}>Update</button>
        <button onClick={this.deleteMonster}>Delete</button>
          </React.Fragment>
          
        )
    }}
    
    

    