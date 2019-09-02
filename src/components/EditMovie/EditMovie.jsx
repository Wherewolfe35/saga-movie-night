import React, { Component } from 'react';
import { connect } from "react-redux";
import "./EditMovie.css"
//material-ui
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

class EditMovie extends Component {
  state = {
    genreToAdd: 1
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'ADD_MOVIES',
    });
    this.props.dispatch({
      type: 'GET_DETAILS',
      payload: this.props.match.params.id
    });
  }

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

  genreChange = (event) => {
    console.log('Changing genres!');
    this.setState({
      genreToAdd: event.target.value
    })
  }
  render() {
    return (
      <>
      {this.props.details !== undefined && 
      <div>
          <h1>Edit {this.props.details.title} {this.props.details.genres.map(genre => <span key={genre}>{genre} </span>)}</h1>
          <TextField value={this.props.details.title} label="title" multiline
            id="standard-uncontrolled" rowsmax="1"
            onChange={(event) => this.inputChange(event, 'title')} placeholder='Movie Title' />
          <TextField value={this.props.details.description} label="description" multiline
            id="standard-multiline-flexible" rowsmax="8" fullWidth
            onChange={(event) => this.inputChange(event, 'description')} placeholder='Movie Description' />
          <br /> <br />
          <FormControl className="formControl">
            <InputLabel color="inherit" htmlFor="age-simple">Genres</InputLabel>
            <Select value={this.props.genreList}
              onChange={this.genreChange}
              inputProps={{
                name: 'Genres',
                id: 'age-simple',
              }}>{this.props.genreList.map(genre => 
          <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>)}
          </Select>
          </FormControl> 
          <Fab color="primary" aria-label="add" >
            <AddIcon />
          </Fab>
          <Fab aria-label="delete" >
            <DeleteIcon />
          </Fab><br /><br />
          <Button variant="outlined" color="inherit"
            onClick={() => this.props.history.push(`/details/${this.props.match.params.id}`)}>Cancel</Button><span> </span>
          <Button variant="outlined" color="inherit"
            onClick={() => this.saveEdit()}>Save</Button>
        </div>}
      </>
    );
  }
}

const storeToProps = (reduxStore) => {
  return {
    details: reduxStore.currentDetails[0],
    genreList: reduxStore.genres
  }
}

export default connect(storeToProps)(EditMovie);