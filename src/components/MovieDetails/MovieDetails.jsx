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
        {this.props.currentDetails.map(detail =>
          <div key={detail.id}>
            <h1>{detail.title} Details <span>{detail.name}</span></h1>
            <img src={detail.poster} alt={detail.title}/>
            <p>{detail.description}</p>
          </div>
        )}
        <button onClick={()=>this.props.history.push('/')}>Back</button>
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