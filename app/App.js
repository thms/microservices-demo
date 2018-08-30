import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './reducer';
import UserList from './UserList';
import User from './User';
import LoanList from './LoanList';
import Loan from './Loan';

const client = axios.create({
  baseURL: 'http://10.93.2.26:8080/',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const Tabs = createBottomTabNavigator({
  LoanList: {
    screen: LoanList
  },
  User: {
    screen: User
  },
  UserList: {
    screen: UserList
  }
});

const Stack = createStackNavigator({
  Home: {
    screen: UserList
  },
  User: {
    screen: User
  },
  LoanList: {
    screen: LoanList
  },
  Loan: {
    screen: Loan
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
});
