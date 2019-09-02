import React, { Component } from 'react';
import { connect } from "react-redux";
import "./EditMovie.css"
//material-ui
import { Button, TextField } from "@material-ui/core";

class EditMovie extends Component {
  //send edited title and description to redux
  saveEdit = () => {
    console.log('clicked save');
    this.props.dispatch({
      type: 'UPDATE_MOVIE',
      payload: {
        title: this.props.details.title,
        description: this.props.details.description,
        id: this.props.match.params.id,
      }
    });
    this.props.history.push(`/details/${this.props.match.params.id}`);
  }
  //update reduxStore with changes made in input field
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
        <h1>Edit {this.props.details.title}</h1>
        <TextField value={this.props.details.title} label="title" multiline 
          id="standard-uncontrolled" rowsmax="1"
          onChange={(event) => this.inputChange(event, 'title')} placeholder='Movie Title' />
        <TextField value={this.props.details.description} label="description" multiline
          id="standard-multiline-flexible" rowsmax="8" fullWidth
          onChange={(event) => this.inputChange(event, 'description')} placeholder='Movie Description' />
          <br /> <br />
        <Button variant="outlined" color="inherit" 
        onClick={() => this.props.history.push(`/details/${this.props.match.params.id}`)}>Cancel</Button><span> </span>
        <Button variant="outlined" color="inherit" 
        onClick={() => this.saveEdit()}>Save</Button>
      </div>
    );
  }
}

const storeToProps = (reduxStore) => {
  return {
    details: reduxStore.currentDetails[0],
    id: reduxStore.currentMovie
  }
}

export default connect(storeToProps)(EditMovie);