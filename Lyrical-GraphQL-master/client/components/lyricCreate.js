import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const { content } = this.state;
    const { songId } = this.props;
    this.props.mutate({
      variables: { content, songId },
    }).then(() => this.setState({ content: '' }));
    // here, refetch is not required
    // since apollo already has a list of songs, uniquely identified by "id", when it receveives the same song again from a mutation,
    // it is automatically updated in its memory too.
    // in the case of song creation, we do not have a parent for songs list similar to the lyric-song relation here
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a lyric</label>
        <input onChange={(event) => this.setState({ content: event.target.value })} value={this.state.content} />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID!){
    addLyricToSong(content: $content, songId: $songId){
      id, 
      lyrics{
        id,
        content,
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate);