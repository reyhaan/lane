import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Root } from "native-base";

import client from './apollo';
import Scenes from './Scenes';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root>
          <Scenes />
        </Root>
      </ApolloProvider>
    );
  }
}
