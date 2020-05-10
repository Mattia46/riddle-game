import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import { Timer, LetsPlayCounter } from './LetsPlay';
import { getUserFromLocal, getTodayUserAnswer, updateUserAnswer } from '../utils';
import { styles } from './style';
import { OptionDialog } from './Dialog';

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

const Riddle = ({ riddle }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [answer, setAnswer] = useState({});
  const [user, setUser] = useState({});
  const [time, setTime] = useState(600);

  const continueGame = () => {
    setShowDialog(false);
    setAnswer({...answer, attemps: 2});
  };

  const stopGame = () => {
    setShowDialog(false);
    if(answer.id) {
      const newAnswer = {...answer, attemps: 1};
      setAnswer(newAnswer);
      setShowSolution(true);
      return updateUserAnswer(newAnswer);
    };
    continueGame();
    alert('Too late');
  };

  useEffect(() => {
    if(riddle) {
      getUserFromLocal()
        .then(user => {
          setUser(user);
          return user;
        })
        .then(getTodayUserAnswer)
        .then(answer => {
          setAnswer(answer);
        });
    }
  }, [riddle]);

  // Game Timer status
  // 0 Timer in progress
  // 1 Timer expired && stopGame
  // 2 Timer expired && continueGame
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.timer}>
        <Text style={styles.riddle}>Riddle</Text>
        { answer.attemps === 0
        && !riddle.expired
        &&<Timer setShowDialog={setShowDialog} time={time}/>}
      </View>
      <Text style={styles.boxContainer}>{riddle.riddle}</Text>
      <Text style={styles.answer}>Answer</Text>
      { riddle.expired
        ? <Solution riddle={riddle} />
        : <InputRiddle
          riddle={riddle}
          user={user}
          answer={answer}
          setAnswer={setAnswer}
          showSolution={showSolution}
          setShowSolution={setShowSolution}
        />
      }
      { !riddle.expired && <UserListAnwsers /> }
      <OptionDialog
        visible={showDialog}
        continueGame={continueGame}
        stopGame={stopGame}
      />
    </View>
  );
}

export { Game };
