import React, { Component } from 'react'
import { Card, CardImg, CardTitle, CardText,
 CardBody,Container,Row,Col } from 'reactstrap';


export default class infoHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            nameOfMonster: '',
            info: '',
            tier: 1,
            imgUrl:'',
            affiliation: null,
            recruitTrigger: null,
            isBoss: false}

    }





    //filter jsonified results from fetch by seperating monsters by tier ('GET')
    componentDidMount() {
        this.props.createdMonster()
    }
   

        deleteMonster = (id) => {
            fetch(`${this.props.baseUrl}/monster/${id}`,{
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': this.props.token
                }
              })
              .then(res=>res.json())
              .then(json=> console.log(json))
              .then(something => this.props.createdMonster())
              .catch(err => err.message)
              this.props.createdMonster()
 
    }
    updateMonster = () => {
        fetch(`${this.props.baseUrl}/monster/${this.state.id}`,{
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
              'Content-Type': 'application/json',
              'authorization': this.props.token
            }
          })
          .then(res=>res.json())
          .then(json=> console.log(json))
          .then(this.setState({id:null}))
          .then(something => this.props.createdMonster())
          .catch(err => err.message)
    this.props.createdMonster()
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
            .then(something => this.props.createdMonster())
            .catch(err => console.log(err.message))
            this.props.createdMonster()
        }
 
handleChange = (event) => {
    console.log(this.state)
    this.setState({[event.target.id]: event.target.value})
  }
selectedMonster = (monster) => {
    
    this.setState({
        id: monster.id,
        nameOfMonster: monster.nameOfMonster,
        info: monster.info,
        imgUrl: monster.imgUrl
    })
    if (this.state.id===monster.id){
        this.setState({
            id:null,
            nameOfMonster:null,
            info:null,
            imgUrl:null
        })
    }
    console.log(`selected monster ${this.state.id}`)
}
changeButton = () => {

  if(this.state.id === null){
      return <button onClick={()=>this.submitMonster()}>Submit Character Data</button>
  } else {
      return <button onClick={()=>this.updateMonster()}>Update Character Data</button>
  }
}
    render() {
        let action;
        if (this.state.id === null){
            action="Create Character"
        } else {
            action=`Update ${this.state.nameOfMonster}`
        }
        let monsterCards= this.props.monsters.map(
            monster => {
                return (
                <Col sm="4" key={monster.id}>
                <Card >
                  <CardImg top width="100%" src={monster.imgUrl} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{monster.nameOfMonster}</CardTitle>
                    <CardText>{monster.info}</CardText>
                    <span aria-label="delete"onClick={()=>this.deleteMonster(monster.id)}>⛔️</span>
                    <span aria-label="edit"onClick={()=>this.selectedMonster(monster)}>🔧</span>

                  </CardBody>
                </Card>
                </Col>
            )
            })
        return (
            <div>
                <Container className="MonsterDeck" style={{paddingTop: '5vh', opacity: '.8'}}>
                <Row>
                {monsterCards}
                </Row>
                </Container>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh', opacity: '.8'}} >
 

 {/* <h1>{action}</h1>
 <label htmlFor="nameOfMonster">Character Name:</label><br/>
 <input onChange={this.handleChange} value={this.state.nameOfMonster} type="text" id="nameOfMonster"/><br/>
 <label htmlFor="imgUrl">Charater ImgUrl</label><br/>
 <input onChange={this.handleChange} value={this.state.imgUrl} type="text" id="imgUrl" /><br/>
 <label htmlFor="info">Character Info</label><br/>
 <input onChange={this.handleChange} value={this.state.info} type="text" id="info" /> <br/>
 {this.changeButton()} */}
 

 <Card> 
     <h1>{action}</h1>
                  <CardImg top width="100%" src={this.state.imgUrl} alt="invalid url" />
                  <CardBody>
                    <CardTitle>Name:{this.state.nameOfMonster}</CardTitle>
                    <input onChange={this.handleChange} value={this.state.nameOfMonster} type="text" id="nameOfMonster"/><br/>
                    <CardText>Info:{this.state.info}</CardText>
                    <input onChange={this.handleChange} value={this.state.info} type="text" id="info" /> <br/>
                    {this.changeButton()}
                  </CardBody>
                </Card>

</div>
 
 
            </div>
        )
    }
}
