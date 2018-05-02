import React, { Component } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator,
  StatusBar, StyleSheet, ScrollView, Platform
} from 'react-native';
import { SearchBar } from "react-native-elements";
import { Ionicons, Entypo } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';

import { Separator } from '../components/List';
import ListItem from '../components/List/ListItem';
import { currencies, rates } from '../resources/data';
import { LastConverted } from '../components/Text';
import styles from '../shared-styles';


let results = [];

class Home extends Component {
  state = {
    currencies: [],
    rates: {
      rates: {}
    },
    res: 23.65,
    results: [],
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
    this.setState({ rates });
  };



  convertCurrency = (base) => {
    const { rates } = this.state.rates
    // const { currencies } = this.state
    results = [];
    if (this.state.text && this.state.rates) {
      Object.keys(rates).forEach((quote) => {
        results.push(
          (rates[quote] / rates[base]) * this.state.text
        )
      })
      for (let currency in currencies) {
        currencies[currency].res = results[currency].toFixed(2)
      }
    }
    console.log(currencies)
    this.setState({})
  };

  renderResults = () => {
  };

  render() {
    let tasks = {
      name: Platform.OS === 'ios' ? `${Platform.OS}-done-all` : 'md-done-all',
      size: 25,
      color: 'white',
    }
    console.log(currencies)
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
          data={currencies}
          renderItem={({ item }) => (
            <ListItem
              chevronColor='red'
              checked={this.state.checked}
              title={item.code}
              subtitle={item.name}
              onPress={() => this.setState({ selected: item.code })}
              rightComponentText={item.res}
            />
          )}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />

        <ActionButton buttonColor="rgba(0, 152, 0,1)"
          position='right' offsetX={10} offsetY={StatusBar.currentHeight + 60}
          active={this.state.fabActive}
          verticalOrientation="down"
          renderIcon={() => <Ionicons {...tasks} />}
          onPress={() => this.convertCurrency(this.state.selected)}
        />

      </View>
    );
  }
}

export default Home;
