import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createAnswer, updateAnswer } from '../../src/graphql/mutations';
import { Button, Input } from "react-native-elements";
import { styles } from './style';

const InputRiddle = ({
  riddle,
  answer,
  setAnswer,
  user,
  showSolution,
  setShowSolution,
}) => {

  useEffect(() => {
    console.log('answer', answer);
  }, [answer]);

  const confirm = () => {
    if(!answer.userSolution) return alert('Aggiungi una risposta');
    answer.id
      ? API.graphql(graphqlOperation(updateAnswer, { input: { ...answer}}))
      : API.graphql(graphqlOperation(createAnswer, { input: {
        date: riddle.date,
        userSolution: answer.userSolution,
        result: false,
        attemps: answer.attemps || 0,
        answerRiddleId: riddle.id,
        answerUserId: user.id
      }})).then(({data: { createAnswer }}) => {
        delete createAnswer.riddle;
        delete createAnswer.user;
        setAnswer(createAnswer)
      }).catch(err => alert('Error InputRiddle CreateAnswer'));

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
          /> }
      </View>
      { answer.attemps !== 1 && <Button
        title={showSolution ? 'Modify' : 'Confirm'}
        type="outline"
        onPress={() => showSolution ? setShowSolution(false) : confirm()}
        containerStyle={styles.button}
      /> }
    </>
  );
};

export { InputRiddle };
