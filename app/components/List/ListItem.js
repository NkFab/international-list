
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image,
  StyleSheet, TouchableOpacity
} from 'react-native';

import { Separator, styles } from '.';

class ListItem extends Component {

  state = {
    checked: false,
    roundAvatar: false,
    title: 'CAD',
    value: 3998.2897,
    subtitle: 'Canadian Dollar',
    chevronColor: 'red'
  }
  static propTypes = {
    checked: PropTypes.bool,
    hideAvatar: PropTypes.bool,
    roundAvatar: PropTypes.bool,
    avatar: PropTypes.func || PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    chevronColor: PropTypes.string,
    rightComponentText:PropTypes.string
  }

  renderAvatar = (status, round) => {

    return status ? round ? //Show it round
      <Image style={styles.leftRound} resizeMethod='resize'
        source={require('../../resources/flag.png')}
      /> :  //Show it rectangular
      <Image style={styles.leftRectangular} resizeMode='center'
        source={require('../../resources/flag.png')}
      /> :  //Hide it
      <Image style={styles.leftHide} resizeMode='center'
        source={require('../../resources/flag.png')}
      />
  }
  render() {
    return (
      <View style={styles.parent}>
        {this.renderAvatar(true, false)}
        <TouchableOpacity style={styles.center} onPress={this.props.onPress} >
          <View style={styles.titleContainer} >
            <Text style={styles.title}>
              {this.props.title || this.state.title}
            </Text>
          </View>
          <View style={styles.subTitleContainer} >
            <Text style={styles.subTitle}>
              {this.props.subtitle || this.state.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.right} >
          <Text style={styles.amount} >
            {this.props.rightComponentText || this.state.value}
          </Text>
        </View>
      </View>
    );
  }
}

export default ListItem;