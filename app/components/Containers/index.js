import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export const Container = ({ style, children }) => {

  return (
    <View style={style}>
      {children}
    </View>
  )
};

Container.propTypes = {
  children: PropTypes.any,
  style: PropTypes.number
}
