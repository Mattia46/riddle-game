import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.boxSolution}>{riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

function Riddle({ riddle, user }) {
  if(!riddle) return null;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <Text style={styles.riddle}>Riddle</Text>
        <Text style={styles.boxContainer}>{riddle.riddle}</Text>
        <Text style={styles.answer}>Answer</Text>
        {riddle.expired
          ? <Solution riddle={riddle} />
          : <InputRiddle riddle={riddle} user={user} />
        }
      </ScrollView>
      { !riddle.expired && <UserListAnwsers /> }
    </View>
  );
}

const styles = StyleSheet.create({
  riddle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 20,
    backgroundColor: '#5c4fa1',
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

export { Riddle };
