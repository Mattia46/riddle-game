import React, { useState, useEffect } from 'react';
import { Avatar, Input, Button, CheckBox } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { riddleByDate } from '../src/graphql/queries';
import { getUserAnswer } from './shared';
import { createRiddle, updateRiddle, updateAnswer } from '../src/graphql/mutations';

const normaliseList = items =>
  items.map(user => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    answer: user.answers.items[0]
  }));

const getNewArray = (userAnswer, newItem) =>
  userAnswer.map(user => user.id === newItem.id ? newItem : user);

const Admin = ({user}) => {
  if(!user || user.name !== 'mattia') return null;

  console.log('Admin');
  const today = new Date().toISOString().split('T')[0]
  const [userAnswer, setUserAnswer] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [riddle, setRiddle] = useState({
    expired: false,
    date: today,
    solution: '',
    riddle: '',
  });

  // Riddle
  const getRiddleOfTheDay = () => API.graphql(graphqlOperation(riddleByDate, { date: today }))
    .then(({data: { riddleByDate: { items }}}) => {
      if(items.length > 0) {
        return setRiddle(items[0]);
      }})
    .catch(({errors}) => alert('Error get riddle by date'));

  const createTodayRiddle = () => API.graphql(graphqlOperation(createRiddle, { input: riddle }))
    .then(({data: { createRiddle }}) => setRiddle(createRiddle))
    .catch(({errors}) => alert('error creating the Riddles', errors[0].message));

  const updateTodayRiddle = () => API.graphql(graphqlOperation(updateRiddle, { input: riddle }))
    .then(({data: { updateRiddle }}) => setRiddle(updateRiddle))
    .catch(({errors}) => alert('error updating the Riddle', errors[0].message))

  // User answers
  const getUsersAnswer = () => API.graphql(graphqlOperation(getUserAnswer, { filter: { date: { eq: today}}}))
    .then(({data: { listUsers: { items }}}) => setUserAnswer(normaliseList(items)))
    .catch(({errors}) => alert('Error user Answer'));

  const submit = () => riddle.id ? updateTodayRiddle() : createTodayRiddle();
  const updateUserAnswer = ({ answer }) => { if(answer)  {
    return API.graphql(graphqlOperation(updateAnswer, { input: { id: answer.id, result: !answer.result }}))
      .catch(({errors}) => alert('Error updating the anser', errors[0].message))
  }}

  useEffect(() => {
    getRiddleOfTheDay();
    getUsersAnswer();
    setUserAnswer(getNewArray(userAnswer, newItem));
  }, [newItem]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          placeholder="Question"
          containerStyle={styles.input}
          multiline={true}
          blurOnSubmit={true}
          value={riddle.riddle}
          onChangeText={e => setRiddle({...riddle, riddle: e})}
        />
        <Input
          placeholder="Answer"
          containerStyle={styles.input}
          underlineColorAndroid='transparent'
          multiline={true}
          blurOnSubmit={true}
          value={riddle.solution}
          onChangeText={e => setRiddle({...riddle, solution: e})}
        />
        <View style={styles.confirm}>
          <CheckBox
            title="Expired"
            checked={riddle.expired}
            onPress={() => setRiddle({...riddle, expired: !riddle.expired})}
          />
          <Button
            type="outline"
            title="Reload"
            onPress={getUsersAnswer}
          />
          <Button
            type="outline"
            title="Confirm"
            onPress={submit}
          />
        </View>
        { userAnswer.map((user, index) => (
          <View key={index} style={styles.userListContainer}>
            <Avatar
              rounded size={50}
              source={{uri: user.avatar}}
              title={user.name}
            />
            <Text style={{flex: 1, marginLeft: 5}}>{user.answer?.userSolution}</Text>
            <CheckBox
              checked={user.answer?.result}
              onPress={() => updateUserAnswer(user)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  userListContainer: {
    borderBottomColor: '#B8B3A7',
    borderBottomWidth: 0.4,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 30,
  },
  confirm: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    borderRadius: 24,
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export { Admin };
