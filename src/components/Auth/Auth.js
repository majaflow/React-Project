import React, {Component} from 'react';

import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      userName: '',
      email: '',
      password: '',
      data: 1
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  loginToggle = (e) => {
    e.preventDefault();
    const _login = this.state.login;
    this.setState({
      login: !_login,
      userName: '',
      email: '',
      password: '',
      data: 1
    })
  }
 
  handleSubmit = (event) => {
    console.log('Login returns:',this.state)
    event.preventDefault();
    let url = this.state.login ? `${this.props.baseUrl}/auth/signin` : `${this.props.baseUrl}/auth/signup`;
    fetch(url,{
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => this.props.tokenHandler(json.sessionToken,json.data))
      
  }
 
  render(){
    let title = this.state.login ? 'Login' : 'Signup';
    let signupFields = this.state.login
      ? null
      : (
        <React.Fragment>
          <label htmlFor="userName">Username:</label><br/>
          <input onChange={this.handleChange} value={this.state.userName} type="text" id="userName" /><br/>
        </React.Fragment>
      )
    return(
      <form className="cardLike" onSubmit={this.handleSubmit}>
        <h1>{title}</h1>
        <label htmlFor="email">Email:</label><br/>
        <input onChange={this.handleChange} value={this.state.email} type="text" id="email" /><br/>
        <label htmlFor="password">Password:</label><br/>
        <input onChange={this.handleChange} value={this.state.password} type="password" id="password" /><br/>
        {signupFields}
        <button onClick={this.loginToggle}>Login/Signup Toggle</button><br/>
        <button type="submit">Submit User Data</button>
      </form>
    )
  }
}

export default Auth;