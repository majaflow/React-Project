import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';
import './main.css'
export default class Enemy extends Component {
    constructor(props){
        super(props);
        this.state= {
            monster: this.props.monster,
            name: this.props.monster.nameOfMonster,
            info: this.props.monster.info,
            gang: this.props.monster.affiliation,
            img: this.props.monster.imgUrl,
            isBoss: this.props.monster.isBoss,
            trigger: this.props.monster.recruitTrigger,
            tier: this.props.monster.tier,
            item: this.props.monster.item

        }
    }

// (pic) lifecycle, all of the props that the object monster has are not fully loaded when called,
// this function basically requires these props to load, then sets the state to these fully defined props in the object
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.monster)
        if (this.state.monster !== nextProps.monster) {
            this.setState({
                monster: nextProps.monster,
                name: nextProps.monster.nameOfMonster,
                info: nextProps.monster.info,
                affiliation: nextProps.monster.affiliation,
                img: nextProps.monster.imgUrl,
                isBoss: nextProps.monster.isBoss,
                trigger: nextProps.monster.recruitTrigger,
                tier: nextProps.monster.tier,
            })
        }
    }    
        render(){
            console.log('this.state returns:', this.state)
           return(
               
                <div >

                <Card className='Frame'> 
        <CardImg top width="100%" src={this.state.img} alt="Disgraceful Display" />
        <CardBody>
          <CardTitle>{this.state.name}</CardTitle>
          <CardSubtitle>Info:</CardSubtitle>
          <CardText>{this.state.info}.</CardText>
        </CardBody>
      </Card>
                </div>
                
            )
            
        }
    }
        