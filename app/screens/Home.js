
import React, { Component } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator,
  StatusBar, StyleSheet, ScrollView
} from 'react-native';
import { SearchBar } from "react-native-elements";


import { ListItem, Separator } from '../components/List';
import { currencies, rates, check } from '../resources/data';
import { LastConverted } from '../components/Text';
import styles from '../shared-styles';

class Home extends Component {
  state = {
    currencies: [],
    rates: {
      rates: {}
    },
    date: null,
    text: null,
    selected: 'RWF',
  };

  renderSeparator = () => {
    return (
      <Separator />
    );
  };
  
  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    return (
      <View
        style={styles.footer}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  componentWillMount() {
    this.setState({ currencies, check, rates });
  };

  convertCurrency = (base) => {
    this.setState({ selected: base })
    const { rates } = this.state.rates
    let quoteValue = [];
    if (this.state.rates) {
      Object.keys(rates).forEach((quote) => {
        quoteValue.push(rates[quote] / rates[base])
      })
      console.log(quoteValue)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="default" />
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.state.selected}</Text>
          </View>
          <View style={styles.separator} />
          <TextInput
            style={styles.input}
            placeholder='enter amount...'
            onChangeText={(text) => this.setState({ text })}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
          />
        </View>
        <FlatList
          style={styles.list}
          data={this.state.currencies}
          renderItem={({ item }) => (
            <ListItem
              chevronColor='red'
              checked={this.state.checked}
              title={item.code}
              subtitle={item.name}
              onPress={() => this.convertCurrency(item.code)}
            />
          )}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
        />
        {/* <LastConverted/> */}
      </View>
    );
  }
}

export default Home;
