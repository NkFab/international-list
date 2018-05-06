import {
  FlatList, ActivityIndicator, StatusBar, Platform
} from 'react-native';
import React, { Component } from 'react';
import { SearchBar } from "react-native-elements";


import { Separator, ListItem } from '../components/Lists';
import { currencies, rates, flagUrl, BTC } from '../resources/data';
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
      baseCurrency: currencies[0].code,
      userEntered: 1,
      currencies,
      rates
    };
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
    this.setState({ currencies, userEntered, baseCurrency })
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false} barStyle="default" />
        <InputWithLabel
          placeholder='Enter amount...'
          enablesReturnKeyAutomatically
          defaultValue='1.00'
          onChangeText={(value) => this.convertCurrency(value, this.state.baseCurrency)}
          underlineColorAndroid='transparent'
          keyboardType='numeric'
          LabelText={this.state.baseCurrency}
        />

        <FlatList
          style={styles.list}
          data={this.state.currencies}
          renderItem={({ item }) => (
            <ListItem
              title={item.code}
              subtitle={item.name}
              hideAvatar={false}
              roundAvatar={false}
              avatar={item.code === 'BTC' ? { uri: BTC }
                : { uri: `${flagUrl}/${item.flag}.png` }}
              onPress={() => this.convertCurrency(this.state.userEntered, item.code)}
              rightComponentText={item.res}
            />
          )}
          keyExtractor={item => item.code}
          ItemSeparatorComponent={() => <Separator />}
          // ListFooterComponent={() => <Footer />}
          ListHeaderComponent={this.renderHeader}
          keyboardShouldPersistTaps='never'
          extraData={this.state}
          keyExtractor={(item) => item.code}
          initialNumToRender={50}
          onEndReachedThreshold={30}
        />
        <LastConverted lastUpdated={rates.date} />
      </Container>
    );
  };
};

export default International;
