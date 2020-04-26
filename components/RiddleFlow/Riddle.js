import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import { Timer, LetsPlay } from './LetsPlay';
import { OptionDialog } from './Dialog';
import { styles } from './style';
import {AsyncStorage} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { getTodayUserAnswers } from '../shared';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.answer}>{riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

const Game = ({ riddle, user }) => {
  const [answer, setAnswer] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [completedGame, setCompletedGame] = useState(false);
  const [secondAttempt, setSecondAttempt] = useState(0);
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if(user && riddle) {
      API.graphql(graphqlOperation(getTodayUserAnswers, {id: user.id, filter: { date: { eq: today}}}))
        .then(({data: { getUser: { answers: { items }}}}) => {
          if(items.length > 0) {
            setAnswer(items[0]);
          }
        });
    }
  }, [user, riddle]);

  const shouldRenderTimer = () => {
    const { attemps } = answer;
    const { expired } = riddle;
    if(attemps > 0 && showTimer && !expired) return <Timer setShowDialog={setShowDialog} />;
    return null;
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={styles.timer}>
          <Text style={styles.riddle}>Riddle</Text>
          { shouldRenderTimer() }
        </View>
        <Text style={styles.boxContainer}>{riddle.riddle}</Text>
        <Text style={styles.answer}>Answer</Text>
        { riddle.expired
          ? <Solution riddle={riddle} />
          : <InputRiddle
            riddle={riddle}
            user={user}
            secondAttempt={secondAttempt}
            completedGame={completedGame}
            answer={answer}
            setAnswer={setAnswer}
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
      { !riddle && !riddle.expired && <UserListAnwsers /> }
    </View>
  );
}

function Riddle({ riddle, user }) {
  if(!riddle) return null;
  const [showMainTimer, setShowMainTimer] = useState();

  useEffect(() => {
    const getLocalStorage = async () => {
      const today = await AsyncStorage.getItem('today');
      const flag = await AsyncStorage.getItem('mainTimer');
      if(!flag && !today) {
        AsyncStorage.setItem('today', new Date().getDate())
        AsyncStorage.setItem('mainTimer', true);
        return setShowMainTimer('true');
      }
      if(flag && today == new Date().getDate()) {
        return setShowMainTimer(flag);
      };
      AsyncStorage.setItem('today', new Date().getDate());
      AsyncStorage.setItem('mainTimer', true);
      return setShowMainTimer('true');
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
