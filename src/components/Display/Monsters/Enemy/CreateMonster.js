import React, {Component} from 'react'
import Enemy from './Enemy'
import Deleted from './Delete'
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
        id: 0,
        complete: 2
     }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.monster !== nextProps.monster) {
            console.log('nextprops.monster returns:',nextProps.monster)
            this.setState({
                nameOfMonster: nextProps.monster.nameOfMonster,
                info: nextProps.monster.info,
                affiliation: nextProps.monster.affiliation,
                imgUrl: nextProps.monster.imgUrl,
                isBoss: nextProps.monster.isBoss,
                trigger: nextProps.monster.recruitTrigger,
                tier: nextProps.monster.tier,
                id: nextProps.monster.id
            })
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
            this.setState({complete: 3})
        }
        handleChange = (event) => {
            console.log(this.state)
            this.setState({[event.target.id]: event.target.value})
          }
        deleteMonster = (event) => {
            event.preventDefault()
            fetch(`${this.props.baseUrl}/monster/${this.props.monster.id}`,{
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': this.props.token
                }
              })
              .then(res=>res.json())
              .then(json=> console.log(json))
              .catch(err => err.message)
              this.setState({complete:undefined})

        }
        edit = (event) => {
            event.preventDefault()
            this.setState({complete:1})
        }
        editMonster = () => {
            if (this.state.complete=== 1) {
            return (<div><button onClick={this.updateMonster}>Update</button>
            <button onClick={this.deleteMonster}>Delete</button></div>) }
            else { return <button onClick={this.edit}>Edit</button>}
        }
        updateMonster = (event) => {
            event.preventDefault()
            fetch(`${this.props.baseUrl}/monster/${this.props.monster.id}`,{
                method: 'PUT',
                body:JSON.stringify(this.state),
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': this.props.token
                }
              }).then(res=>res.json())
              .then(json=>console.log(json))
              this.setState({complete:2})
              this.props.reUp()
        }
        viewConductor = () => {
            return  this.state.complete === 1 ? <Enemy monster={this.state}/> : 
            this.state.complete === 2 ? <Enemy monster={this.props.monster} /> :
            this.state.complete === 3 ? <div><Enemy monster={this.state}/><h1>Monster Created</h1></div>:
            <Deleted/>
        }
    render() {
        return(
            <React.Fragment>
            {this.viewConductor()}
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
          {this.editMonster()}
          </React.Fragment>
          
        )
    }}
    
    

    