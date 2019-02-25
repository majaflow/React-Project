import React, {Component} from 'react'
import Enemy from './Enemy'
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
    //calculates stats for a given monster
    // giveStats = (tier,isBoss) => {
    //     (isBoss== true) ? hp== Math.floor((Math.random()*(tier+tier))+tier)*tier :
    //     hp== Math.floor((Math.random()*(tier+tier))+tier);
 
    //     let ap= Math.floor((Math.random()*(tier+tier))+tier);
    //     (hp/3 >ap) ? ap == hp/3 :
    //     (ap/2 >hp) ? hp == ap/2 : ap==ap, hp==hp;
    //      }
    // //calculates aggression of a given monster (subject to change)
    //  isAggro = (affiliation,isBoss,reputation) => {
    //      (isBoss===true) ? aggro === true :
    //      (affiliation == reputation) ? aggro === true :
    //      aggro === false
    //  }
        

     //filter jsonified results from fetch by seperating monsters by tier ('GET')
     componentDidMount(){
         fetch(`${this.props.baseUrl}/monster/`,{
           method: 'GET',
           headers: {
             'Content-Type': 'application/json'
           }
         }).then(res=>res.json())
         .then(json=>{
             let monsterPool = []
             let x = Math.floor(Math.random()*monsterPool.length)
            for (var i = 0; i < json.length ; i ++) {

                if (json[i].tier === this.props.difficulty) {
                monsterPool.push(json[i])
                }
                    else console.log('error in infofetch')
                    
                }
                this.setState({
                    monster: monsterPool[x]
                })
                console.log(this.state.monster)
                
           })


    //     .then(json=>enemy(json))
}       

    /*     .then(json=>json.forEach(filterResults()))
         const filterResults = (el) => {
             console.log(el)
             let monster = el
             let tier = monster.tier
             console.log(tier)
             tier > 2 ? this.setState({part3: monster}):
             tier === 2 ? this.setState({part2: monster}):
             tier < 1 ? this.setState({part1:monster}) : console.log(monster)

             }  

            }
        }
*/
    
    //the fetch for data from my server and jsonify them then filtering them(above)
    //my render of info should have conditional for actions or actions should have conditional

render(){
    return (
        <Enemy monster={this.state.monster}/>
    )
}
}
