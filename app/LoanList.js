import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getLoans } from './reducer';

class LoanList extends Component {

  static navigationOptions = {
    title: 'Loans'
  };

  componentDidMount() {
    this.props.getLoans(this.props.token, this.props.borrowerId);
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
    <TouchableOpacity
      style={styles.item}
      onPress={() => this.props.navigation.navigate('Loan', { id: item.id })}>
      <Text>Amount: {item.amount}</Text>
      <Text>Interest Rate: {item.interest_rate}%</Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    const { loans } = this.props;
    return (
      <FlatList
        styles={styles.container}
        data={loans}
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

const mapStateToProps = (state, ownProps) => {
  let storedLoans = state.loans.map(loan => ({ key: loan.id, ...loan }));
  return {
    loans: storedLoans,
    borrowerId: ownProps.borrowerId || null,
    token: state.token
  };
};

const mapDispatchToProps = {
  getLoans
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanList);
