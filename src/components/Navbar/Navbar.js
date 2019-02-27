import React from 'react';
import Search from '../Display/CharacterSearch'
import './Navbar.css';

import Logout from './Logout/Logout';

const Navbar = (props) => {
  return(
    <nav>
      <Logout logout={props.logout}/>
      <Search baseUrl={props.baseUrl}/>
    </nav>
  )
}

export default Navbar;