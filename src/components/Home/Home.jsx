import React, { Component } from 'react';
import { connect } from "react-redux";

class Home extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({
      type: 'ADD_MOVIES',
    })
  }

  viewDetails = (id) => {
    this.props.dispatch({
      type: 'CURRENT_DETAIL',
      payload: id
    })
    this.props.history.push('/details');
  }

  render() {
    return (
      <div>
        <h2><u>Current Movies</u></h2>
        {this.props.reduxStore.movies.map(movie =>
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title} onClick={()=>this.viewDetails(movie.id)}/>
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