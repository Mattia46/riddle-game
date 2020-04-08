import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Input } from 'react-native-elements';
import { UserListAnwsers } from './userLiveAnswers';
import { createAnswer, updateAnswer } from '../src/graphql/mutations';
import { getTodayUserAnswers } from './shared';
import { Button } from "react-native-elements";

function InputRiddle({riddle, user}) {
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
      ? API.graphql(graphqlOperation(updateAnswer, { input: { ...answer}}))
      : API.graphql(graphqlOperation(createAnswer, { input: {
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
        });
    setShowSolution(true);
  };

  return (
    <React.Fragment>
      { showSolution
        ? <Text style={styles.boxSolution}> {answer.userSolution} </Text>
        : <Input
          placeholder="Inseristi la tua risposta"
          containerStyle={styles.input}
          multiline={true}
          value={answer.userSolution}
          onChangeText={e => setAnswer({...answer, userSolution: e})}
        />
      }
      <Button
        title={showSolution ? 'Modifica' : 'Conferma'}
        type="outline"
        onPress={() => showSolution ? setShowSolution(false) : confirm()}
        containerStyle={styles.button}
      />
      <UserListAnwsers />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    borderRadius: 24,
    justifyContent: 'space-around',
    marginTop: 50,
  },
  boxSolution: {
    backgroundColor: '#70c8b7',
    padding: 20,
  },
});

export { InputRiddle };
