import React from 'react';

import './Navbar.css';

import Logout from './Logout/Logout';

const Navbar = (props) => {
  return(
    <nav>
      <Logout logout={props.logout}/>
      
    </nav>
  )
}

export default Navbar;