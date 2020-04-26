import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Input } from 'react-native-elements';
import { createAnswer, updateAnswer } from '../../src/graphql/mutations';
import { getTodayUserAnswers } from '../shared';
import { Button } from "react-native-elements";
import { styles } from './style';

function createUserAnswer(riddle, user, answer){
  return API.graphql(graphqlOperation(createAnswer, { input: {
    date: riddle.date,
    userSolution: answer.userSolution,
    result: false,
    attemps: 0,
    answerRiddleId: riddle.id,
    answerUserId: user.id
  }}))
};

function updateUserAnswer(answer) {
  return API.graphql(graphqlOperation(updateAnswer, { input: { ...answer}}));
};

function InputRiddle({
  riddle,
  user,
  completedGame,
  secondAttempt,
}) {
  const [answer, setAnswer] = useState({});
  const [showSolution, setShowSolution] = useState(false);
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if(user && riddle) {
      API.graphql(graphqlOperation(getTodayUserAnswers, {id: user.id, filter: { date: { eq: today}}}))
        .then(({data: { getUser: { answers: { items }}}}) => {
          if(items.length > 0) {
            setAnswer(items[0]);
            setShowSolution(true);
          }
        });
    }
  }, [user, riddle]);

  const confirm = () => {
    if(!answer.userSolution) return alert('Aggiungi una risposta');
    answer.id
      ? updateUserAnswer({...answer, attemps: secondAttempt})
      : createUserAnswer(riddle, user, answer)
      .then(({data: { createAnswer }}) => {
        delete createAnswer.riddle;
        delete createAnswer.user;
        setAnswer({...createAnswer, attemps: secondAttempt})
      });
    setShowSolution(true);
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        { showSolution || completedGame
          ? <Text style={styles.boxSolution}>{answer.userSolution}</Text>
          : <Input
            placeholder="Add your answer"
            multiline={true}
            value={answer.userSolution}
            onChangeText={e => setAnswer({...answer, userSolution: e})}
          />
        }
      </View>
      {!completedGame && <Button
        title={showSolution ? 'Modify' : 'Confirm'}
        type="outline"
        onPress={() => showSolution ? setShowSolution(false) : confirm()}
        containerStyle={styles.button}
      />}
    </React.Fragment>
  );
};

export { InputRiddle };
