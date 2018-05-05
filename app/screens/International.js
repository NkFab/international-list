import {
  View, Text, TextInput, FlatList, ActivityIndicator,
  StatusBar, StyleSheet, ScrollView, Platform
} from 'react-native';
import React, { Component } from 'react';
import { SearchBar } from "react-native-elements";


import { Separator, ListItem } from '../components/Lists';
import { fewCurrencies, fewRates, flagUrl, BTC } from '../resources/data';
import { LastConverted } from '../components/Texts';
import { sharedSytles, styles } from '../shared-styles';
import { InputWithLabel } from '../components/Inputs';
import { Container } from '../components/Containers';
import { Footer } from '../components/Elements'

let results = [];

class International extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: fewCurrencies[0].code,
      fewCurrencies,
      fewRates
    };
  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  componentWillMount() {
    this.convertCurrency();
  };

  convertCurrency(amount = 1) {
    const { rates } = this.state.fewRates
    const { baseCurrency } = this.state
    results = [];
    if (this.state.fewRates) {
      Object.keys(rates).forEach((quoteCurrency) => {
        results.push(
          (rates[quoteCurrency] / rates[baseCurrency]) * amount
        )
      })

      for (let index in fewCurrencies) {
        fewCurrencies[index].res = results[index].toFixed(2)
      }
    }
    this.setState({ fewCurrencies })
  };

  render() {
    console.log(this.state.baseCurrency)
    return (
      <Container style={styles.container}>

        <StatusBar translucent={false} barStyle="default" />
        <InputWithLabel
          placeholder='Enter amount...'
          enablesReturnKeyAutomatically
          defaultValue='1.00'
          onChangeText={(value) => this.convertCurrency(value)}
          underlineColorAndroid='transparent'
          keyboardType='numeric'
          LabelText={this.state.baseCurrency}
        />

        <FlatList
          style={styles.list}
          data={this.state.fewCurrencies}
          renderItem={({ item }) => (
            <ListItem
              title={item.code}
              subtitle={item.name}
              hideAvatar={false}
              roundAvatar={false}
              avatar={item.code === 'BTC' ? { uri: BTC }
                : { uri: `${flagUrl}/${item.flag}.png` }}
              onPress={() => this.setState({ baseCurrency: item.code })}
              rightComponentText={item.res}
            />
          )}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={this.renderHeader}
          keyboardShouldPersistTaps='never'
          extraData={this.state}
          keyExtractor={(item) => item.code}
          initialNumToRender={50}
          onEndReachedThreshold={30}
        />
        <LastConverted lastUpdated={fewRates.date} />

      </Container>
    );
  }
}

export default International;
