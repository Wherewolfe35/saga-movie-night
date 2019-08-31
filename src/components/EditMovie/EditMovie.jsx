import React, { Component } from 'react';
import { connect } from "react-redux";

class EditMovie extends Component {
  state = {}

  saveEdit = () => {
    console.log('clicked save');
    this.props.dispatch({
      type: 'UPDATE_MOVIE',
      payload: {
        title: this.props.details.title,
        description: this.props.details.description,
        id: this.props.id,
      }
    });
    this.props.history.push('/details');
  }

  inputChange = (event, propertyName) => {
    if (propertyName === 'title') {
      this.props.dispatch({
        type: 'EDIT_TITLE',
        payload: event.target.value
      })
    } else {
      this.props.dispatch({
        type: 'EDIT_DESCRIPTION',
        payload: event.target.value
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Edit Page</h1>
        <input value={this.props.details.title}
          onChange={(event) => this.inputChange(event, 'title')} placeholder='Movie Title' />
        <input value={this.props.details.description}
          onChange={(event) => this.inputChange(event, 'description')} placeholder='Movie Description' />
        <button onClick={() => this.props.history.push('/details')}>Cancel</button>
        <button onClick={() => this.saveEdit()}>Save</button>
      </div>
    );
  }
}

const storeToProps = (reduxStore) => {
  return {
    details: reduxStore.editDetails,
    id: reduxStore.currentMovie
  }
}

export default connect(storeToProps)(EditMovie);