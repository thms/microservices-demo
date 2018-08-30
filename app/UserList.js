import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getUsers } from './reducer';

class UserList extends Component {

  static navigationOptions = {
    title: 'Users'
  };

  componentDidMount() {
    this.props.getUsers();
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.navigation.navigate('User', { id: item.id })}>
        <Text>{item.name}</Text>
        </TouchableOpacity>
    </View>
  );
  
  render() {
    const { users } = this.props;
    return (
      <FlatList
        styles={styles.container}
        data={users}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

const mapStateToProps = state => {
  let storedUsers = state.users.map(user => ({ key: user.id, ...user }));
  return {
    users: storedUsers
  };
};

const mapDispatchToProps = {
  getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
