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
import { currencies, rates, flagUrl } from '../resources/data';
import { LastConverted } from '../components/Text';
import { styles, sharedSytles } from '../shared-styles';


let results = [];
const BTC = 'https://i.redditmedia.com/cMknl5zhfcxcTsudfkm-_IJTzjWoUWtg2MCkFVHZzqs.png?fit=crop&crop=faces%2Centropy&arh=2&w=960&s=7b9b29e713df4f5f2ea19e235653b161'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

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
    this.setState({ rates, date: rates.date });
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
    this.setState({})
  };

  renderItem = (item) => {
    return (
      <ListItem
        title={item.code}
        subtitle={item.name}
        hideAvatar={false}
        roundAvatar={false}
        avatar={item.code === 'BTC' ? { uri: BTC }
          : { uri: `${flagUrl}/${item.flag}.png` }
        }
        onPress={() => this.setState({ selected: item.code })}
        rightComponentText={item.res}
      />
    );
  };

  render() {
    const FAB = {
      name: Platform.OS === 'ios' ? `${Platform.OS}-done-all`
        : 'md-done-all', size: 25, color: 'white',
    }
    // console.log(rates.date)
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
            placeholder='Enter amount...'
            enablesReturnKeyAutomatically

            onChangeText={(text) => this.setState({ text })}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
          />
        </View>

        <FlatList
          style={styles.list}
          data={currencies}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          keyExtractor={(item) => item.code}
          initialNumToRender={50}
        />
        <LastConverted base={this.state.selected}
          amount={this.state.text} lastUpdated={'2018-09-05'}
        />
        <ActionButton buttonColor={sharedSytles.backgroundColor}
          position='right' offsetX={10} offsetY={StatusBar.currentHeight + 60}
          active={this.state.fabActive}
          verticalOrientation="down"
          renderIcon={() => <Ionicons {...FAB} />}
          onPress={() => this.convertCurrency(this.state.selected)}
        />

      </View>
    );
  }
}

export default Home;
