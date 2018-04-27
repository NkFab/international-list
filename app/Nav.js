import { StackNavigator, } from 'react-navigation';

import CurrencyList from './screens/CurrencyList';
import Converter from './screens/Converter';


const RootNav = StackNavigator({
  List: {
    screen: CurrencyList
  },
  Converter: {
    screen: Converter
  }
}, {
    initialRouteName: 'List'
  })

export default RootNav;