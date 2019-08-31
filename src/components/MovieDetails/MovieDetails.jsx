import React, { Component } from 'react';
import { connect } from "react-redux";

class MovieDetails extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_DETAILS',
      payload: this.props.currentId
    })
  }

  render() {
    console.log(this.props.currentId);
    return (
      <>
          <div key={this.props.currentDetails.id}>
            <h1>{this.props.currentDetails.title} Details <span>{this.props.currentDetails.name}</span></h1>
            <img src={this.props.currentDetails.poster} alt={this.props.currentDetails.title} />
            <p>{this.props.currentDetails.description}</p>
          </div>
        <button onClick={() => this.props.history.push('/')}>Back</button>
        <button onClick={() => this.props.history.push('/edit')}>Edit</button>
      </>
    );
  }
}

const storeToProps = (reduxStore) => {
  return {
    currentId: reduxStore.currentMovie,
    currentDetails: reduxStore.currentDetails
  }
}

export default connect(storeToProps)(MovieDetails);