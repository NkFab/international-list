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
import { currencies, rates, check } from '../resources/data';
import { LastConverted } from '../components/Text';
import styles from '../shared-styles';


let quoteRates = [];

class Home extends Component {
  state = {
    currencies: [],
    rates: {
      rates: {}
    },
    res: 23.65,
    quoteRates: [],
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
    const { rates } = this.state.rates
    quoteRates = [];
    if (this.state.text && this.state.rates) {
      Object.keys(rates).forEach((quote) => {
        quoteRates.push((rates[quote] / rates[base]) * this.state.text)
      })
      this.setState({ quoteRates })
    }
  };

  render() {
    let tasks = {
      name: Platform.OS === 'ios' ? `${Platform.OS}-done-all` : 'md-done-all',
      size: 25,
      color: 'white',
    }
    {
      this.state.quoteRates &&
        console.log(this.state.selected)
      console.log(this.state.text)
      console.log(quoteRates)
    }
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
              onPress={() => this.setState({ selected: item.code })}
              rightComponentText={item.code}
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
