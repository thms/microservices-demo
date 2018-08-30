import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from './reducer';
import LoanList from './LoanList';

class User extends Component {

  static navigationOptions = {
    title: 'User'
  };

  componentDidMount() {
    let id = 1;
    try {
      id = this.props.navigation.state.params.id;
    } catch(err) {
    }
    this.props.getUser(id);
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  render() {
    const { user, loadingUser } = this.props;

    if (loadingUser) return <Text>Loading...</Text>;

    return (
      <View>
      <Text>Name: { user.name }</Text>
      <Text>Email: { user.email }</Text>
      <Text>Loans</Text>
      <LoanList borrowerId={user.id} navigation={this.props.navigation}/>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
  loadingUser: state.loadingUser
});

const mapDispatchToProps = {
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
