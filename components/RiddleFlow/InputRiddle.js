import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Input } from 'react-native-elements';
import { createAnswer, updateAnswer } from '../../src/graphql/mutations';
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
  answer,
  setAnswer
}) {
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if(answer) return setShowSolution(true);
  }, []);

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
