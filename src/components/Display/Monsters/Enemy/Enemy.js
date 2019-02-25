import React, {Component} from 'react'


export default class Enemy extends Component {
    constructor(props){
        super(props);
        this.state= {

            name: this.props.monster.nameOfMonster,
            info: this.props.monster.info,
            affiliation: this.props.monster.affiliation,
            hp: undefined,
            ap: undefined,
            item: undefined,
            aggro: undefined
        }
    }
    //calculates stats for a given monster
    /*giveStats = (tier) => {
        let hp= Math.floor((Math.random()*(tier+tier))+tier)
        let tier= this.state.tier
        let bossHp=  Math.floor((Math.random()*(tier+tier))+tier)*tier
        let ap= Math.floor((Math.random()*(tier+tier))+tier);
        balance = (newHp, newAp) => { 
            if(hp <= ap/2) {
                let newHp = ap/2
            } else if (ap<= hp/3){
                let newAp = hp/3
            } else if (isBoss=== true) {
                let newHp = bossHp}
                else (newHp=hp, newAp=ap);
                this.setState({
                    hp: this.newHp,
                    ap: this.newAp
                })
            }
            balance(hp,ap,this.state.boss)
        }
        // calculates aggression of a given monster (subject to change)
        isAggro = (affiliation,isBoss,reputation) => {
            let affiliation= this.state.gang
            let aggro = this.state.aggro
            (isBoss===true) ? aggro === true :
            (affiliation == reputation) ? aggro === true :
            aggro === false
            this.setState({
                aggro: aggro
            })
        }
        */
        render(){
            return(
               
                <div className='Frame'>
                <img src={this.state.img} alt='Disgraceful Display'/>
                <h1>Name:{this.state.name}</h1>
                <p>Info:{this.state.info}</p>
                </div>
                
            )
            
        }
    }
        