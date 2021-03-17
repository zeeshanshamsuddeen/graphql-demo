import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSong from '../queries/fetchSong';
import LyricCreate from './lyricCreate';
import LyricList from './lyricList';

class SongDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back</Link>

        <h3>{this.props.data.song.title}</h3>
        
        <LyricList lyrics={this.props.data.song.lyrics}/>

        <LyricCreate songId={this.props.params.id} />
      </div>
    )
  }
}

// mutations are called manually and hence its much easier to pass dynamic data
export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } }
  }
})(SongDetail);
