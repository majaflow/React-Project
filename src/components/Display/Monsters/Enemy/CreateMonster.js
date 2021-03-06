import React, {Component} from 'react'


import './main.css'
export default class Create extends Component {
    constructor(props) {
     super(props);
     this.state= {
        nameOfMonster: '',
        info: '',
        tier: 1,
        imgUrl:'',
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
            }).then(something => this.props.reUp())
            .catch(err => console.log(err.message))
        }
        handleChange = (event) => {
            console.log(this.state)
            this.setState({[event.target.id]: event.target.value})
          }
       
    render() {
        return(
            <React.Fragment>
 
            <form className="cardo" onSubmit={this.submitMonster}>
            <h1>Character</h1>
            <label htmlFor="nameOfMonster">Character Name:</label><br/>
            <input onChange={this.handleChange} value={this.state.nameOfMonster} type="text" id="nameOfMonster" /><br/>
            <label htmlFor="imgUrl">Charater ImgUrl</label><br/>
            <input onChange={this.handleChange} value={this.state.imgUrl} type="text" id="imgUrl" /><br/>
            <label htmlFor="info">Character Info</label><br/>
            <input onChange={this.handleChange} value={this.state.info} type="text" id="info" /> <br/>
            <button type="submit">Submit Character Data</button>
          </form>
       
          </React.Fragment>
          
        )
    }}
    
    

    