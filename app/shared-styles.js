import { StatusBar, StyleSheet } from 'react-native';

export const sharedSytles = {
  backgroundColor: 'rgba(0, 190, 0,1)',
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sharedSytles.backgroundColor,
  },
  list: {
    width: '99%',
    marginTop: 2,
    backgroundColor: 'white'
  }
});
