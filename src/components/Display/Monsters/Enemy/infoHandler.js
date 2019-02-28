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
                
                console.log('moster array returns:',monsterPool)
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
        console.log('This.state.monster retruns:',this.state.monster)

        return (
            <div>
                <Create baseUrl={this.props.baseUrl} progress={this.props.progress} monster={this.state.monster}
                    token={this.props.token} monsters={this.state.monsters} reUp={this.mahMonster} />
            </div>
        )
    }
}
