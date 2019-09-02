import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Header extends Component {
  render() {
    return (
        <header>
          <h1>Movie Night</h1>
          <Link to="/admin">Admin</Link>
        </header>
    );
  }
}

export default Header;