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
      <>{/* Using conditional rendering here because the page tries to load before current details is set. 
      I'm sure this can be fixed using saga, but not sure how*/}
        {this.props.currentDetails !== '' && this.props.currentDetails.map(details => <div key={details.id}>
          <h1>{details.title} Details <span>{details.genres.map(genre => <span key={genre}> {genre}</span>)}
          </span>
          </h1>
          <img src={details.poster} alt={details.title} />
          <p>{details.description}</p>
        </div>)}
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