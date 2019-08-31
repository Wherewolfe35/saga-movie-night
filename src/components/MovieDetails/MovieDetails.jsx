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
    return (
      <>
          {this.props.currentDetails !== '' && <div key={this.props.currentDetails[0].id}>
          <h1>{this.props.currentDetails[0].title} Details <span>{this.props.currentDetails.map(genre => <span key={genre.name}> {genre.name}</span>)}</span></h1>
            <img src={this.props.currentDetails[0].poster} alt={this.props.currentDetails[0].title} />
            <p>{this.props.currentDetails[0].description}</p>
          </div>
          }
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