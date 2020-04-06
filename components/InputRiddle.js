import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, Image, StyleSheet, Text,View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { Input } from 'react-native-elements';
import { UserListAnwsers } from './userLiveAnswers';
import { createAnswer, updateAnswer } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';
import { getTodayUserAnswers } from './shared';
import { Timer } from '../components/Timer';
import { Button } from "react-native-elements";

function getInput ({user, riddle, solution}) {
  return ({input: {
    date: riddle.date,
    userSolution: solution,
    result: false,
    attemps: 0,
    answerRiddleId: riddle.id,
    answerUserId: user.id
  }})
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

function ButtonContainer({shouldRender, enabled, handler, riddle, onFinish}) {
  if(!enabled || riddle.expired) return null;
  return (
    <View>
      <Button
        title={shouldRender ? 'Modifica' : 'Conferma'}
        type="outline"
        onPress={handler}
        containerStyle={styles.button}
      />
      <Timer riddle={riddle} onFinish={onFinish}/>
    </View>
  );
};

function InputRiddle({riddle, user}) {
  const [solution, setSolution] = useState('');
  const [shouldRender, setShouldRender] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [answer, setAnswer] = useState();
  const today = new Date().toISOString().split('T')[0]

  const checkExistingAnswer = ({id}) => API.graphql(graphqlOperation(getTodayUserAnswers, {id, filter: { date: { eq: today}}}));
  const createTodayUserAnswer = ({user, riddle, solution}) => API.graphql(graphqlOperation(createAnswer, getInput({user, riddle, solution})));
  const updateTodayUserAnswer = ({answer, solution}) => API.graphql(graphqlOperation(updateAnswer, { input: {id: answer.id, userSolution: solution}}));

  const onFinish = () => {
    console.log('ere');
    //setShouldRender(true);
    //setEnabled(false);
  };

  useEffect(() => {
    if(user && riddle) {
      checkExistingAnswer({ id: user.id}).then(({data}) => {
        const todayAnswer = data.getUser?.answers?.items[0];
        if(todayAnswer) {
          setAnswer(todayAnswer);
          setSolution(todayAnswer.userSolution);
          setShouldRender(true);
        }
      });
    }
  }, [user, riddle]);

  const confirm = async () => {
    if(!solution) return alert('Aggiungi una risposta');
    setShouldRender(true);
    if(answer) {
      return updateTodayUserAnswer({answer, solution});
    }
    createTodayUserAnswer({user, riddle, solution}).then(({data: { createAnswer }}) => setAnswer(createAnswer));
  };

  const handler = () => {
    if(shouldRender) {
      return setShouldRender(false);
    }
    return confirm();
  };

  return (
    <View>
      <UserSolution
        solution={solution}
        shouldRender={shouldRender}
        setSolution={setSolution}
      />
      <ButtonContainer
        riddle={riddle}
        shouldRender={shouldRender}
        handler={handler}
        onFinish={onFinish}
        enabled={enabled}
      />
      <UserListAnwsers />
    </View>
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
  solution: {
    margin: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export { InputRiddle };
