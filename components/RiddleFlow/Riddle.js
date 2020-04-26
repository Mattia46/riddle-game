import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import { Timer, LetsPlay } from './LetsPlay';
import { OptionDialog } from './Dialog';
import { styles } from './style';
import {AsyncStorage} from 'react-native';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.answer}>{riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

const Game = ({ riddle, user }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [completedGame, setCompletedGame] = useState(false);
  const [secondAttempt, setSecondAttempt] = useState(0);

  return (
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
}

function Riddle({ riddle, user }) {
  if(!riddle) return null;
  const [showMainTimer, setShowMainTimer] = useState();

  useEffect(() => {
    const getLocalStorage = async () => {
      const flag = await AsyncStorage.getItem('mainTimer');
      if(!flag) {
        AsyncStorage.setItem('mainTimer', true);
        return setShowMainTimer('true');
      }
      setShowMainTimer(flag);
    }
    getLocalStorage();
  }, []);

  return (
    <React.Fragment>
      { showMainTimer == 'true' && !riddle.expired
        ? <LetsPlay setShowMainTimer={setShowMainTimer} />
        : <Game riddle={riddle} user={user}/>
      }
    </React.Fragment>
  )
}

export { Riddle };
