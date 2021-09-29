import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//establish the connection to the back-end server's /graphql endpoint

// //instantia te apollo client and 
  
//   link: authLink.concat(httpLink),  // connection end point
//   cache: new InMemoryCache(), //to cache API response data 

const client = new ApolloClient({
  request: operation => {
      const token = localStorage.getItem('id_token');

      operation.setContext({
          headers: {
              authorization: token ? `Bearer ${token}` : ''
          }
      })
  },
  cache: new InMemoryCache(), //to cache API response data 
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>

    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>

  );
}

export default App;
