import React, { Component } from 'react'

import Create from '../Enemy/CreateMonster'
//whole thing needs testing
import x from './Randomvar'
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

                let monsterPool = []
                let otherMonsters = []
                for (var i = 0; i < json.length; i++) {

                    if (json[i].tier <= this.props.difficulty) {
                        monsterPool.push(json[i])
                    }
                    else otherMonsters.push(json[i])

                }
                console.log(monsterPool)
                const x = Math.floor(Math.random() * monsterPool.length)
                this.setState({
                    monster: monsterPool[x],
                    monsters: monsterPool,
                    x: x
                })
                console.log(this.state.monster.id)

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


    render() {
        console.log(this.state.monster)

        return (
            <div>
                <Create baseUrl={this.props.baseUrl} progress={this.props.progress} monster={this.state.monster}
                    token={this.props.token} monsters={this.state.monsters} reUp={this.mahMonster} />
            </div>
        )
    }
}
