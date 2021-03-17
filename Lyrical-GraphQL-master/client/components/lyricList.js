import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      // guess the response so that the apollo store is updated as soon as mutation is sent
      // the mutation response will anyhow update the apollo store correctly
      optimisticResponse: {
        _typename: 'Mutation',
        likeLyric: {
          _typename: 'LyricType',
          id,
          likes: likes + 1,
        }
      }
    })
    // here, refetch is not required
    // since apollo already has a list of lyrics, uniquely identified by "id", when it receveives the same lyric again from a mutation,
    // it is automatically updated in its memory too.
    // in the case of song creation, we do not have a parent for songs list similar to the lyric-like relation here
  }

  render() {
    return (
      <ul className="collection">
        {this.props.lyrics.map((lyric) => <li className="collection-item" key={lyric.id}>
          {lyric.content}
          <div className="vote-box">
            <i className="material-icons" onClick={() => this.onLike(lyric.id, lyric.likes)}>thumb_up</i>
            {lyric.likes}
          </div>
        </li>)}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID){
    likeLyric(id: $id){
      id,
      likes	
    }
  }
`

export default graphql(mutation)(LyricList);