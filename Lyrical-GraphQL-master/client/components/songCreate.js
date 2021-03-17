import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSongsQuery from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query: fetchSongsQuery }] // apollo by default, does not refetch the songs when navigated to songsList the second time.
    })
      .then(() => { hashHistory.push('/') })
  }

  render() {
    return (
      <div>

        <Link to="/">Back</Link>

        <h3>Create a new song</h3>

        <form onSubmit={this.onSubmit.bind(this)}>

          <label>Enter song title</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>

      </div>
    )
  }
}

// similat to mutation in graphiql
const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      title
    }
  }
`

export default graphql(mutation)(SongCreate);