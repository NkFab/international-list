import { StatusBar, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
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
});

export default styles;