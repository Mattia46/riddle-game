import {  StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  button: {
    width: 200,
    alignSelf: 'center',
    padding: 30,
  },
  logo: {
    height: 150,
    width: 150,
  },
  gameContainer: {
    width: 320,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  name: {
    fontSize: 25,
    padding: 20,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#5c4fa1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminContainer: {
    backgroundColor: 'white',
  },
  userListContainer: {
    borderBottomColor: '#B8B3A7',
    borderBottomWidth: 0.4,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 30,
  },
  confirm: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    borderRadius: 24,
    justifyContent: 'space-around',
    marginTop: 20,
  },

});

export { styles };
