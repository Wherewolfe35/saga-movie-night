import React, { Component } from 'react';
import { connect } from "react-redux";
//material-ui
import { GridList, GridListTile, GridListTileBar, ListSubheader, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class Home extends Component {
  state = {
    search: '',
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'ADD_MOVIES',
    })
  }

  viewDetails = (id) => {
    this.props.history.push(`/details/${id}`);
  }

  searchBar = (event) => {
    this.setState({
      search: event.target.value,
    })
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'SEARCH_MOVIES',
      payload: this.state.search
    })
  }

  clear = () => {
    this.setState({
      search: '',
    })
    this.props.dispatch({
      type: 'ADD_MOVIES',
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <SearchIcon />
          <TextField variant="filled" id="filled-search" placeholder="Search" className="searchBar"
            onChange={this.searchBar} value={this.state.search} /> <span> </span>
          <Button variant="outlined" color="inherit" type="submit">Search</Button> <span> </span>
          <Button variant="outlined" color="inherit" onClick={this.clear}>Clear Search</Button>
        </form>
        <div className="homeGrid">
          <GridList>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div" color='primary'>Current Movies</ListSubheader>
            </GridListTile>
            {this.props.reduxStore.movies.map(movie =>
              <GridListTile key={movie.id} cols={0.5}>
                <img src={movie.poster} alt={movie.title} onClick={() => this.viewDetails(movie.id)} />
                <GridListTileBar
                  title={movie.title}
                  subtitle={movie.description}
                />
              </GridListTile>
            )}
          </GridList>
        </div>
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