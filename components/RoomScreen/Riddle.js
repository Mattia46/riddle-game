import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import { Timer, LetsPlayCounter } from './LetsPlay';
import { OptionDialog } from './Dialog';
import { styles } from './style';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.boxSolutionRiddle}>{riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

const Game = ({ riddle, isGameStarted, setIsGameStarted }) => {
  if(!riddle) return null;
  return (
    <>
      { !isGameStarted && !riddle.expired
        ? <LetsPlayCounter setIsGameStarted={setIsGameStarted} />
        : <Riddle riddle={riddle}/>
      }
    </>
  );
};

function Riddle({ riddle }) {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text style={styles.riddle}>Riddle</Text>
      <Timer setShowDialog={() => alert('expired')}/>
      <Text style={styles.boxContainer}>{riddle.riddle}</Text>
      <Text style={styles.answer}>Answer</Text>
      <OptionDialog
        //visible={showDialog}
        //setCompletedGame={setCompletedGame}
        //setShowDialog={setShowDialog}
        //setSecondAttempt={setSecondAttempt}
        //setShowTimer={setShowTimer}
      />
      { riddle.expired
        ? <Solution riddle={riddle} />
        : <InputRiddle riddle={riddle} />
      }
      { !riddle.expired && <UserListAnwsers /> }
    </View>
  );
}

export { Game };
