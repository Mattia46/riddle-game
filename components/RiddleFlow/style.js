import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  timer: {
    display: 'flex',
    backgroundColor: '#5c4fa1',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riddle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  answer: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 25,
  },
  boxContainer: {
    fontSize: 16,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: '#5c4fa1',
    color: 'white',
  },
  boxSolution: {
    fontSize: 16,
    padding: 20,
  },
});

export { styles };
