import React, { Component } from 'react';
import { connect } from "react-redux";
import './MovieDetails.css';
import { Button } from "@material-ui/core";

class MovieDetails extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_DETAILS',
      payload: this.props.match.params.id
    })
  }

  render() {
    console.log(this.props);
    return (
      <section>{/* Using conditional rendering here because the page tries to load before current details is set. 
      I'm sure this can be fixed using saga, but not sure how*/}
        {this.props.currentDetails && this.props.currentDetails.map(details => <div key={details.id}>
          <h1>{details.title} Details <span>{details.genres.map(genre => <span key={genre}> {genre} &nbsp;</span>)}
          </span>
          </h1>
          <img src={details.poster} alt={details.title} />
          <p>{details.description}</p>
          <Button variant="outlined" color="inherit"
            onClick={() => this.props.history.push('/')}>Back</Button> <span> </span>
          <Button variant="outlined" color="inherit"
            onClick={() => this.props.history.push(`/edit/${details.id}`)}>Edit</Button>
        </div>
        )}
      </section>
    );
  }
}

const storeToProps = (reduxStore) => {
  return {
    currentDetails: reduxStore.currentDetails
  }
}

export default connect(storeToProps)(MovieDetails);