import React, { Component } from 'react';
import { connect } from "react-redux";
//material-ui
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'ADD_MOVIES',
    })
  }

  viewDetails = (id) => {
    this.props.history.push(`/details/${id}`);
  }

  render() {
    return (
      <div>
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