import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

export const Footer = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};