import React, { useState, useEffect } from 'react';
import { TextInput, Image, StyleSheet, Text,View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { UserListAnwsers } from './userLiveAnswers';
import { createAnswer } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';
import { getTodayUserAnswers } from './shared';

function getInput ({user, riddle}) {
  return {input: {
    date: riddle.date,
    userSolution: user.name,
    result: false,
    attemps: 0,
    answerRiddleId: riddle.id,
    answerUserId: user.id
  }}
}

function UserSolution({solution, setSolution, shouldRender}) {
  if(!shouldRender) return (
    <Input
      placeholder="Inseristi la tua risposta"
      containerStyle={styles.input}
      multiline={true}
      underlineColorAndroid='transparent'
      blurOnSubmit={true}
      value={solution}
      onChangeText={e => setSolution(e)}
    />
  );

  return (
    <View style={styles.solution}>
      <Text> {solution} </Text>
    </View>
  )
};

function InputRiddle({riddle, user}) {
  const [solution, setSolution] = useState('');
  const [answered, setAnswered] = useState(false);
  const [buttonValue, setButtonValue] = useState('Conferma');
  const [answer, setAnswer] = useState();
  const today = new Date().toISOString().split('T')[0]

  const checkExistingAnswer = ({id}) => API.graphql(graphqlOperation(getTodayUserAnswers, {id: id, filter: { date: { eq: today}}}));
  //const initAnswer = ({user, riddle}) => API.graphql(graphqlOperation(createAnswer, getInput({user, riddle})))

  useEffect(() => {
    // Added the if statement in order to call GraphAPI only when props ready
    if(user && riddle) {
      checkExistingAnswer({ id: user.id}).then(({data}) => console.log('today usre', data.getUser.answers.items));
      //initAnswer({user, riddle})
        //.then(({data: { createAnswer }}) => setAnswer(createAnswer));
    }
    // value in square brackets are observed like onPropsUpdate
  }, [user, riddle]);

  const handleAnswer = async () => {
    console.log('>>>>...', user);
    console.log('asnwere', riddle);
  };
  const handler = () => {
    setAnswered(!answered);
    const value = buttonValue === 'Conferma'
      ? 'Modifica'
      : 'Conferma';
    setButtonValue(value);
    handleAnswer();
  };

  return (
    <View>
      <View style={styles.solution}>
        <Text> {riddle.riddle} </Text>
      </View>
      <UserSolution
        solution={solution}
        shouldRender={answered}
        setSolution={setSolution}
      />
      <Button
        title={buttonValue}
        type="outline"
        onPress={handler}
        containerStyle={styles.button}
      />
      <UserListAnwsers />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    //padding: 5,
  },
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    //margin: 8,
    borderRadius: 24,
    justifyContent: 'space-around',
    marginTop: 50,
  },
  solution: {
    margin: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export { InputRiddle };
