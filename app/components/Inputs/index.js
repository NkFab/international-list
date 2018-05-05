import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export const InputWithLabel = (props) => {

  return (
    <View style={styles.inputContainer}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.LabelText}</Text>
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.input} {...props}
      />
    </View>
  )
};

InputWithLabel.propTypes = {
  LabelText: PropTypes.string,
};
