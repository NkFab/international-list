import {
  FlatList, ActivityIndicator, StatusBar, Platform,
} from 'react-native';
import React, { Component } from 'react';
import { SearchBar } from "react-native-elements";

import {
  currencies, rates, flagUrl, flagBTC,
  flagXAG, flagXAU, flagXDR
} from '../resources/data';

import { Separator, ListItem } from '../components/Lists';
import { LastConverted } from '../components/Texts';
import { sharedSytles, styles } from '../shared-styles';
import { InputWithLabel } from '../components/Inputs';
import { Container } from '../components/Containers';
import { Footer } from '../components/Elements'
import Listint from '../components/ListStuff/listint'

let results = [];
class International extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: currencies[0].code,
      userEntered: 1.00,
      currencies,
      rates
    };
  };

  handleFlag = (currency) => {
    if (currency.hasOwnProperty('flag')) {
      return currency.flag ? `${flagUrl}/${currency.flag}.png` : null;
    } else {
      switch (currency.code) {
        case 'BTC':
          return flagBTC;
        case 'XDR':
          return flagXDR;
        case 'XAU':
          return flagXAU;
        case 'XAG':
          return flagXAG;
        default:
          return `${flagUrl}/${currency.code.substr(0, 2)}.png`;
      }
    }
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  componentWillMount() {
    this.convertCurrency(this.state.userEntered, this.state.baseCurrency);
  };

  convertCurrency(userEntered, baseCurrency) {
    const { rates } = this.state.rates
    results = [];
    if (this.state.rates) {
      Object.keys(rates).forEach((quoteCurrency) => {
        results.push((rates[quoteCurrency] / rates[baseCurrency]) * userEntered);
      })
      for (let index in currencies) {
        currencies[index].res = results[index].toFixed(2)
      }
    }
    return this.setState({ currencies, userEntered, baseCurrency })
  };
  _renderItem = ({item}) => (
    <Listint 
      code={item.code}
      name={item.name}
      res={item.res}
      flag={this.handleFlag(item)}
      onPress={()=> this.convertCurrency(this.state.userEntered, item.code)}
    />
  );
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false} barStyle="default" />
        <InputWithLabel
          placeholder='Enter amount...'
          enablesReturnKeyAutomatically
          defaultValue={this.state.userEntered.toString()}
          onChangeText={(value) => this.convertCurrency(value, this.state.baseCurrency)}
          underlineColorAndroid='transparent'
          keyboardType='numeric'
          LabelText={this.state.baseCurrency}
        />

        <FlatList
          style={styles.list}
          data={this.state.currencies}
          renderItem={this._renderItem}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={() => <Footer />}
          keyboardShouldPersistTaps='never'
          extraData={this.state}
          keyExtractor={(item) => item.code}
          initialNumToRender={10}
          onEndReachedThreshold={30}
        />
        <LastConverted lastUpdated={rates.date} />
      </Container>
    );
  };
};

export default International;