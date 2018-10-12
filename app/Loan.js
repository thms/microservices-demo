import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { getLoan } from './reducer';

class Loan extends Component {

  static navigationOptions = {
    title: 'Loan'
  };

  componentDidMount() {
    let id = 1;
    try {
      id = this.props.navigation.state.params.id;
    } catch(err) {
    }
    this.props.getLoan(this.props.token, id);
  }

  render() {
    const { loan, loadingLoan } = this.props;

    if (loadingLoan) return <Text>Loading...</Text>;

    return (
      <View>
      <Text>Product: Term Loan</Text>
      <Text>Amount: { loan.amount } Euro</Text>
      <Text>Rate: { loan.interest_rate } %</Text>
      <Text>Maturity: { loan.maturity } Months</Text>
      </View>
    );
  }
}


const mapStateToProps = ({ loan, loadingLoan, token }) => ({
  loan,
  loadingLoan,
  token
});

const mapDispatchToProps = {
  getLoan
};

export default connect(mapStateToProps, mapDispatchToProps)(Loan);
