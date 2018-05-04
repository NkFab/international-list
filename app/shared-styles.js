import { StatusBar, StyleSheet } from 'react-native';

export const sharedSytles = {
  backgroundColor: 'rgba(0, 190, 0,1)',
}
$backgroundColor = 'rgba(0, 190, 0,1)'

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $backgroundColor,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    width: '99%',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  input: {
    height: 47,
    width: '99%',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    fontSize: 18,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    height: 48,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  separator: {
    height: '100%',
    width: StyleSheet.hairlineWidth,
    backgroundColor: "black",
  },
  list: {
    width: '99%',
    marginTop: 2,
    backgroundColor: 'white'
  }
});
