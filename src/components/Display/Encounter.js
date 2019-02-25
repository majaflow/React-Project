import React, {Component} from 'react';
import Enemy from './Monsters/Enemy/Enemy';
import Party from './Monsters/Party/Party';
import Actions from './Actions/Actions'
 
export default class Encounter extends Component {
    constructor(props){
        super(props);
        this.state= {
            enemy: {
            name:'',
            info:'',
            tier:Number,
            hp: Number,
            ap: Number,
            aggro: Boolean,
            isBoss: Boolean,
            affiliation:'',
            recruitTrigger:'',
            item:''},
            party: {
                totalHp: Number,
                totalAp: Number,
                reputation: '',
                items: []
            },
            userData: null
        } 
    }

    render() {
        return <ReactFragment>
            <Enemy tier={this.state.tier}/>
            <Actions aggro={this.state.aggro}/>
            <Party/>
        </ReactFragment>
    }
}
