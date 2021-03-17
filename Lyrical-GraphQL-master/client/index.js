import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClinet from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import './style/style.css';
import SongList from './components/songList';
import App from './components/app';
import SongCreate from './components/songCreate';
import SongDetail from './components/songDetail';

// tell apollo to uniquely identify objects using "id"
// Make sure all queries and mutations return "id" 
const client = new ApolloClinet({
  dataIdFromObject: o => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={SongList} />
          <Route path="/songs/new" component={SongCreate} />
          <Route path="/songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
