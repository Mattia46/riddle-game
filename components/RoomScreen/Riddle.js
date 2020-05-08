import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import { styles } from './style';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.boxSolutionRiddle}>{riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

function Riddle({ riddle, user }) {
  if(!riddle) return null;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        <Text style={styles.riddle}>Riddle</Text>
        <Text style={styles.boxContainer}>{riddle.riddle}</Text>
        <Text style={styles.answer}>Answer</Text>
        {riddle.expired
          ? <Solution riddle={riddle} />
          : <InputRiddle riddle={riddle} user={user} />
        }
      { !riddle.expired && <UserListAnwsers /> }
    </View>
  );
}

export { Riddle };
