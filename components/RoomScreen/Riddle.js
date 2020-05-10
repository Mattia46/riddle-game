import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import { Timer, LetsPlayCounter } from './LetsPlay';
import { getUserFromLocal, getTodayUserAnswer } from '../utils';
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
  const [showButton, setShowButton] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [answer, setAnswer] = useState({});
  const [user, setUser] = useState({});

  const continueGame = () => {
    setShowDialog(false);
    setAnswer({...answer, attemps: 1});
  };

  const stopGame = () => {
    setShowDialog(false);
    setShowSolution(true);
    setShowButton(false);
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
          setShowSolution(true);
        });
    }
  }, [riddle]);


  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.timer}>
        <Text style={styles.riddle}>Riddle</Text>
        { answer.attemps !== 1 && <Timer setShowDialog={setShowDialog}/>}
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
          showButton={showButton}
        />
      }
      { !riddle.expired && <UserListAnwsers /> }
      <OptionDialog
        visible={showDialog}
        setShowDialog={setShowDialog}
        continueGame={continueGame}
        stopGame={stopGame}
      />
    </View>
  );
}

export { Game };
