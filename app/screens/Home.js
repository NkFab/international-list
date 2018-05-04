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
      baseCurrency: 'RWF',
    };
  }

  renderSeparator = () => <Separator />

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
    this.setState({ rates, currencies: currencies });
  };

  convertCurrency = (base) => {
    const { rates } = this.state.rates
    // const { currencies } = this.state
    results = [];
    if (this.state.rates) {
      Object.keys(rates).forEach((quote) => {
        results.push(
          // (rates[quote] / rates[base]) * this.state.text
          (rates[quote] / rates[this.state.baseCurrency]) * base
        )
      })
      for (let currency in currencies) {
        currencies[currency].res = results[currency].toFixed(2)
      }
    }
    this.setState({ currencies: currencies })
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
        onPress={() => this.setState({ baseCurrency: item.code })}
        rightComponentText={item.res}
      />
    );
  };

  render() {
    const FAB = {
      name: Platform.OS === 'ios' ? `${Platform.OS}-done-all`
        : 'md-done-all', size: 25, color: 'white',
    }
    // console.log(this.state.currencies)
    return (
      <View style={styles.container}>

        <StatusBar translucent={false} barStyle="default" />
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.state.baseCurrency}</Text>
          </View>
          <View style={styles.separator} />
          <TextInput
            style={styles.input}
            placeholder='Enter amount...'
            enablesReturnKeyAutomatically

            onChangeText={(value) => this.convertCurrency(value)}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
          />
        </View>

        <FlatList
          style={styles.list}
          data={this.state.currencies}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          keyboardShouldPersistTaps='never'
          extraData={this.state}
          // ListFooterComponent={this.renderFooter}
          keyExtractor={(item) => item.code}
          initialNumToRender={20}
        />
        <LastConverted base={this.state.baseCurrency}
          amount={this.state.text} lastUpdated={rates.date}
        />

      </View>
    );
  }
}

export default Home;
