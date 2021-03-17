import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';


import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends Component {

  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch())
    // alternative for refetchQueries, refetch() calls all the queries associated with this component again
    // ie. use refetchQueries when the query to refetch is not associated with current component
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return <li
        key={song.id}
        className="collection-item"
      >
        <Link onClick={() => hashHistory.push(`/songs/${song.id}`)}>
          {song.title}
        </Link>
        <i className="material-icons collection-item" onClick={() => this.onSongDelete(song.id)}>delete</i>
      </li>
    })
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    };

    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id){
      id,
      title,
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongsQuery)(SongList));
