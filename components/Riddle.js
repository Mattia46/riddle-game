import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { styles } from './sharedStyle';

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
    <React.Fragment>
      <Text style={styles.boxContainer}> {riddle.riddle} </Text>
      {riddle.expired
        ? <Solution riddle={riddle} />
        : <InputRiddle riddle={riddle} user={user} />
      }
    </React.Fragment>
  );
}

export { Riddle };
