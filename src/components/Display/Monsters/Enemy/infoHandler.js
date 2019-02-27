import React, {Component} from 'react'
import Enemy from './Enemy'
import Create from '../Enemy/CreateMonster'
//whole thing needs testing
export default class infoHandler extends Component {
    constructor(props){
        super(props);
        this.state= {
            monster: {}
            
        }
    }
    //I want to select a single monster from one of the state parts, pretty sure its not doing that though
    enemyInfo = () => {
        let level = this.props.difficulty
        const pickEnemy = (tier) => {
        
         let monster = Math.floor(Math.random()*tier.length)
         return tier[monster]
        }
        (level<= 1) ? pickEnemy(this.state.part1) :
        (level<= 2) ? pickEnemy(this.state.part2) :
        (level<= 3) ? pickEnemy(this.state.part3) :
        (level> 3) ? console.log('win') : console.log('nothing son')
    }

        

     //filter jsonified results from fetch by seperating monsters by tier ('GET')
     componentDidMount(){
         fetch(`${this.props.baseUrl}/monster/`,{
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             'authorization': this.props.token
           }
         }).then(res=>res.json())
         .then(json=>{
             let monsterPool = []
             let otherMonsters= []
             for (var i = 0; i < json.length ; i ++) {
                 
                 if (json[i].tier <= this.props.difficulty) {
                     monsterPool.push(json[i])
                    }
                    else otherMonsters.push(json[i])
                    
                }
                console.log(monsterPool)
                this.setState({
                    monster: monsterPool[0]
                })
                console.log(this.state.monster)
           })
        }       
    nextMonster = () => {
        let x = Math.floor(Math.random()*this.monsterPool.length)
        this.setState({monster: this.monsterPool[x+1]})
    }
createMonster = (event) => {
    event.preventDefault()
    return (<Create baseUrl={this.props.baseUrl}progress={this.props.progress} token={this.props.token}/>)
}
//updateMonster= (event)=> {
 //   event.preventDefault()
//    return(<Update baseUrl={this.props.baseUrl}progress={this.props.progress} token={this.props.token}/>)
//}
render(){
    console.log(this.state.monster)
   // <button onClick={this.updateMonster}>Update Character</button>
    return (
        <div>
       <Enemy monster={this.state.monster}next={this.nextMonster}/>
       <Create baseUrl={this.props.baseUrl}progress={this.props.progress} token={this.props.token}/>
        </div>
    )
}
}
