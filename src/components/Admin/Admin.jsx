import React, { Component } from 'react';

class Admin extends Component {
  state = { 
    authenticate: false,
   }
  render() { 
    return ( 
      <>
        {!this.state.authenticate ? <div>
          <input placeholder="username" />
          <input placeholder="password" />
        </div>
        :
        <form>
          <input placeholder="Genre"/>
          <button>Add</button>
        </form>}
      </>
     );
  }
}
 
export default Admin;