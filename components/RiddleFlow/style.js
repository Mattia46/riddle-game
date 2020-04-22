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
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  container: {
    height: 140,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  input: {
    padding: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  boxSolution: {
    fontSize: 18,
  },
  liveContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'flex-end',
    padding: 20,
  },
  avatar: {
    display: 'flex',
    marginLeft: -5,
  },
  icon: {
    top: -16,
    right: 20,
    borderRadius: 25,
    height: 20,
    width: 20,
  },
  rankContainer: {
    borderBottomColor: '#B8B3A7',
    borderBottomWidth: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 30,
    marginTop: 15,
  },
  solution: {
    flex: 1,
    marginTop: 5,
  },
});

export { styles };
