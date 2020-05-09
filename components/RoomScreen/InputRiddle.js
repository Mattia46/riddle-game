import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createAnswer, updateAnswer } from '../../src/graphql/mutations';
import { getTodayUserAnswers } from '../shared';
import { Button, Input } from "react-native-elements";
import { styles } from './style';
import { getUserFromLocal } from '../utils';

const InputRiddle = ({riddle}) => {
  console.log('InputRiddle');
  const [answer, setAnswer] = useState({});
  const [user, setUser] = useState({});
  const [showSolution, setShowSolution] = useState(false);
  const today = new Date().toISOString().split('T')[0]

  const getTodayUserAnswer = user => API.graphql(graphqlOperation(getTodayUserAnswers, {id: user.id, filter: { date: { eq: today}}}))
    .then(({data: { getUser: { answers: { items }}}}) => {
      if(items.length > 0) {
        setAnswer(items[0]);
        setShowSolution(true);
      }
    }).catch(err => alert('Error InputRiddle getTodayUserAnswer'));

  const updateUserAnswer = () => API.graphql(graphqlOperation(updateAnswer, { input: { ...answer}}))
    .catch(err => alert('Error InputRiddle updateAnswer'));

  const createUserAnswer = () => API.graphql(graphqlOperation(createAnswer, { input: {
    date: riddle.date,
    userSolution: answer.userSolution,
    result: false,
    attemps: 0,
    answerRiddleId: riddle.id,
    answerUserId: user.id
  }})).then(({data: { createAnswer }}) => {
    delete createAnswer.riddle;
    delete createAnswer.user;
    setAnswer(createAnswer)
  }).catch(err => alert('Error InputRiddle CreateAnswer'));

  useEffect(() => {
    if(riddle) {
      getUserFromLocal().then(user => getTodayUserAnswer(user));
    }
  }, [riddle]);

  const confirm = () => {
    if(!answer.userSolution) return alert('Aggiungi una risposta');
    answer.id ? updateUserAnswer() : createUserAnswer();
    setShowSolution(true);
  };

  return (
    <>
      <View style={styles.container}>
        { showSolution
          ? <Text style={styles.boxSolution}>{answer.userSolution}</Text>
          : <Input
            placeholder="Add your answer"
            multiline={true}
            value={answer.userSolution}
            onChangeText={e => setAnswer({...answer, userSolution: e})}
          />
        }
      </View>
      <Button
        title={showSolution ? 'Modify' : 'Confirm'}
        type="outline"
        onPress={() => showSolution ? setShowSolution(false) : confirm()}
        containerStyle={styles.button}
      />
    </>
  );
};

export { InputRiddle };
