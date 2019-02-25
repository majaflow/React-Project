import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Splash from './components/Display/Monsters/Enemy/infoHandler'
import APIURL from './helpers/enviroment'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sessionToken: undefined,
       //Only considered booleanesque on clientside
      userData: null
    }
  }

  componentWillMount() {
    localStorage.removeItem('token');
  }
//master base url can be found here
// this view function passes props of the state and baseUrl variable
  viewConductor = () => {
    const url = `${APIURL}`
    return this.state.sessionToken !== undefined ? <Splash gameProgress={this.progress} 
    difficulty={this.state.userData} baseUrl={url}/> 
    : <Auth baseUrl={url} tokenHandler={this.storeSessionToken}/>;
  }
  
  progress= () => {
    let _userData = this.state.userData;
    this.setState({
      userData: _userData + 1
    })
  }
  storeSessionToken = (token) => {
    localStorage.setItem('token', token)
    this.setState({
      sessionToken: token,
      userData: 1
  })
  }
  // should save user data then discards token on logout
  removeSessionToken = () => {
    fetch(this.url,{
      method: 'PUT',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.setState({sessionToken: undefined}))
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(`app.js fetch: ${err}`))
  }
  
  
  render() {
    console.log(this.state.sessionToken);
    return (
      <React.Fragment>
        <Navbar logout={this.removeSessionToken}/>
        
        {this.viewConductor()}
      </React.Fragment>
    );
  }
}
  


export default App;
