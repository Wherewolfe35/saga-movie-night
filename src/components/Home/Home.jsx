import React, { Component } from 'react';
import { connect } from "react-redux";

class Home extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({
      type: 'ADD_MOVIES',
    })
  }

  render() {
    return (
      <div>
        <p>This is home</p>
        {this.props.reduxStore.movies.map(movie =>
          <div>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.description}</p>
          </div>
        )}
      </div>
    );
  }
}

const storeToProps = (reduxStore) => {
  return {
    reduxStore
  }
}

export default connect(storeToProps)(Home);