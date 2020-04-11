import React, { useState, useEffect } from 'react';
import { Input, Button, CheckBox } from 'react-native-elements';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar } from "react-native-elements";
import { riddleByDate } from '../src/graphql/queries';
import { getUserAnswer } from './shared';
import { createRiddle, updateRiddle, updateAnswer } from '../src/graphql/mutations';
import { onCreateAnswer, onUpdateAnswer } from '../src/graphql/subscriptions';

function normaliseObject(obj) {
  const { user, id, date, userSolution, result } = obj;
  delete user.answers;
  return ({
    ...user,
    answer: { id, date, userSolution, result }
  });
};

function Admin({user}) {
  if(!user || user.name !== 'mattia') return null;

  const windowWidth = Dimensions.get('window').width;
  const today = new Date().toISOString().split('T')[0]
  const [userAnswer, setUserAnswer] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [riddle, setRiddle] = useState({
    expired: false,
    date: today,
    solution: '',
    riddle: '',
  });

  useEffect(() => {
    const newArray = userAnswer.map(user => {
      return user.id === newItem.id
        ? newItem
        : user;
    });
    setUserAnswer(newArray);
  }, [newItem]);

  useEffect(() => {
    API.graphql(graphqlOperation(riddleByDate, { date: today }))
      .then(({data: { riddleByDate: { items }}}) => {
        if(items.length > 0) {
          return setRiddle(items[0]);
        }
      });

    API.graphql(graphqlOperation(getUserAnswer, { filter: { date: { eq: today}}}))
      .then(({data: { listUsers: { items }}}) => {
        const list = items.map(user => ({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          answer: user.answers.items[0]
        }));
        setUserAnswer(list);
      });

    const onUpdateUserAnswer = API.graphql(graphqlOperation(onUpdateAnswer))
      .subscribe(({value: { data: { onUpdateAnswer }}}) =>
        setNewItem(normaliseObject(onUpdateAnswer)));
    const onCreateUserAnswer = API.graphql(graphqlOperation(onCreateAnswer))
      .subscribe(({value: { data: { onCreateAnswer }}}) => {
        setNewItem(normaliseObject(onCreateAnswer));
      });

    return () => {
      onUpdateAnswer.unsubscribe();
      onCreateAnswer.unsubscribe();
    };
  }, []);

  const submit = () => {
    if(riddle.id) {
      return API.graphql(graphqlOperation(updateRiddle, { input: riddle }))
        .then(({data: { updateRiddle }}) => setRiddle(updateRiddle));
    }
    if(!riddle.riddle) return alert('add riddle and solution');
    return API.graphql(graphqlOperation(createRiddle, { input: riddle }))
      .then(({data: { createRiddle }}) => setRiddle(createRiddle));
  };

  const updateUserAnswer = data => {
    const { answer } = data;
    if(answer) {
      API.graphql(graphqlOperation(updateAnswer,
        { input: { id: answer.id, result: !answer.result }}
      ));
    }
  }

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
