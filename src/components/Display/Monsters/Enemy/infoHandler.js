import React, { Component } from 'react'

import Create from '../Enemy/CreateMonster'

export default class infoHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monster: {},
            monsters: [],
            x: 0
        }
    }





    //filter jsonified results from fetch by seperating monsters by tier ('GET')
    componentDidMount() {
        fetch(`${this.props.baseUrl}/monster/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                let monsterPool = json
 
                this.setState({
                    monster: monsterPool[0],
                    monsters: monsterPool,
                    x:0
                })
            })
    }
    createdMonster = () => {
    fetch(`${this.props.baseUrl}/monster/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        }
    }).then(res => res.json())
        .then(json => {
            console.log(json)
            let monsterPool = json
            let x = monsterPool.length-1
            this.setState({
                monster: monsterPool[x],
                monsters: monsterPool
            })
        })
}
    mahMonster = () => {
        
        fetch(`${this.props.baseUrl}/monster/${this.state.monster.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                let monster = json
                this.setState({
                    monster: monster
                })
            })
    }
    deletedMonster = () => {
        let monsterPool = this.state.monsters
     monsterPool.shift()
        
   
        this.setState({
            monster: monsterPool[0],
            monsters: monsterPool
        })
    }
 

    render() {
        console.log('This.state.monster retruns:',this.state.monster)

        return (
            <div>
                <Create baseUrl={this.props.baseUrl} create={this.createdMonster} monster={this.state.monster}
                    token={this.props.token} monsters={this.state.monsters} delete={this.deletedMonster} reUp={this.mahMonster} />
            </div>
        )
    }
}
