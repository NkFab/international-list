
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { currencies, abrev } from '../resources/data';


class Converter extends Component {

  state = {
    currencies: {
      date: null,
      rates: {}
    },
    abrev: []
  }
  componentWillMount() {
    this.setState({ currencies, abrev });
  }

  convertCurrency = (nextRate) => {
    return nextRate
  }

  render() {

    const { currency } = this.props.navigation.state.params
    const { rates, date } = this.state.currencies;
    let nextRate
    if (rates) {
      nextRate = (rates[currency] / rates['RWF']).toFixed(4)
    }
    {
      // this.state.abrev && console.log(this.state.abrev)
    }
    return (
      <View style={styles.container}>
        <Text>{nextRate !== 0 ? nextRate : null}</Text>
        <Text>{currency}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});

export default Converter;
