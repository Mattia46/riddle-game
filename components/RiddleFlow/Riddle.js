import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import { Timer, LetsPlay } from './LetsPlay';
import { OptionDialog } from './Dialog';
import { styles } from './style';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.answer}>{riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

function Riddle({ riddle, user }) {
  if(!riddle) return null;
  const [showMainTimer, setShowMainTimer] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [completedGame, setCompletedGame] = useState(false);
  const [secondAttempt, setSecondAttempt] = useState(false);

  const Game = () => (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={styles.timer}>
          <Text style={styles.riddle}>Riddle</Text>
          { showTimer && !riddle.expired && <Timer setShowDialog={setShowDialog}/> }
        </View>
        <Text style={styles.boxContainer}>{riddle.riddle}</Text>
        <Text style={styles.answer}>Answer</Text>
        {riddle.expired
          ? <Solution riddle={riddle} />
          : <InputRiddle
            riddle={riddle}
            user={user}
            secondAttempt={secondAttempt}
            completedGame={completedGame}
          />
        }
      <OptionDialog
        visible={showDialog}
        setCompletedGame={setCompletedGame}
        setShowDialog={setShowDialog}
        setSecondAttempt={setSecondAttempt}
        setShowTimer={setShowTimer}
      />
      </ScrollView>
      { !riddle.expired && <UserListAnwsers /> }
    </View>
  );

  return (
    <React.Fragment>
      {showMainTimer && !riddle.expired
        ? <LetsPlay setShowMainTimer={setShowMainTimer} />
        : <Game />
      }
    </React.Fragment>
  )
}

export { Riddle };
