import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
  },
  container: {
    minHeight: 70,
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
  icon: {
    top: -16,
    right: 20,
    borderRadius: 25,
    height: 20,
    width: 20,
  },
  containerRankList: {
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
  boxSolutionRiddle: {
    fontSize: 16,
    padding: 20,
  },
  noRiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5c4fa1',
  },
  containerLive: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'flex-end',
    padding: 20,
  },
  avatar: {
    display: 'flex',
    marginLeft: -5,
  },
  timer: {
    display: 'flex',
    backgroundColor: '#5c4fa1',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export { styles };
