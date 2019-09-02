import React, { Component } from 'react';
import { connect } from "react-redux";

class Admin extends Component {
  state = {
    authenticate: false,
    username: '',
    password: '',
    genreToAdd: '',
  }
  // on input change, state is appropriately changed
  userPassword = (event, name) => {
    this.setState({
      ...this.state,
      [name]: event.target.value
    });
  }
  // authenticates username and password, alerts if either are incorrect
  login = (event) => {
    event.preventDefault();
    if (this.state.username === 'camera' && this.state.password === 'action') {
      this.setState({
        authenticate: true,
        username: '',
        password: '',
        genreToAdd: '',
      });
    } else {
      alert('Invalid username or password');
      this.setState({
        ...this.state,
        username: '',
        password: '',
      });
    }
  }

  genreChange = (event) => {
    this.setState({
      ...this.state,
      genreToAdd: event.target.value,
    });
  }

  submitGenre = () => {
    this.props.dispatch({
      type: 'NEW_GENRE',
      payload: {
        name: this.state.genreToAdd
      }
    });
    this.setState({
      ...this.state,
      genreToAdd: ''
    });
  }

  render() {
    return (
      <>
        {!this.state.authenticate ? <div className="loginBox">
          <form onSubmit={this.login}>
            <input placeholder="username" value={this.state.username}
              onChange={(event) => this.userPassword(event, 'username')} />
            <input placeholder="password" type="password" value={this.state.password}
              onChange={(event) => this.userPassword(event, 'password')} />
            <button type="submit">Login</button>
          </form>
        </div>
          :
          <div className="adminForm">
            <form>
              <input placeholder="Genre" value={this.state.genreToAdd} onChange={this.genreChange} />
              <button onClick={this.submitGenre}>Add Genre</button>
            </form>
          </div>}
      </>
    );
  }
}

export default connect()(Admin);