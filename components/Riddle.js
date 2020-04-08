import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.boxSolution}> {riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

function Riddle({ riddle, user }) {
  if(!riddle) return null;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text style={styles.boxContainer}> {riddle.riddle} </Text>
      {riddle.expired
        ? <Solution riddle={riddle} />
        : <InputRiddle riddle={riddle} user={user} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    padding: 20,
    backgroundColor: '#5c4fa1',
    color: 'white',
  },
  boxSolution: {
    backgroundColor: '#ffc910',
    padding: 20,
  },
});

export { Riddle };
