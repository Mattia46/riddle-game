import React, { useState, useEffect } from 'react';
import { Avatar, Input, Button, CheckBox } from 'react-native-elements';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createRiddle, updateRiddle, updateAnswer } from '../../src/graphql/mutations';
import { styles } from './style';
import { getTodayRiddle, getUsersAnswer, initRiddle } from '../utils';

const Admin = ({user}) => {
  if(!user || user.name !== 'mattia') return null;

  const [userAnswer, setUserAnswer] = useState([]);
  const [riddle, setRiddle] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const init = () => {
    getTodayRiddle().then(data => data ? setRiddle(data) : setRiddle(initRiddle()));
    getUsersAnswer().then(setUserAnswer);
  };

  const onRefresh = () => {
    init();
    setRefreshing(false);
  };

  const submit = () => {
    if(riddle.id) {
      return API.graphql(graphqlOperation(updateRiddle, { input: riddle }))
        .then(({data: { updateRiddle }}) => setRiddle(updateRiddle))
        .catch(({errors}) => alert('error updating the Riddle'))
    } else if (riddle.riddle && riddle.solution){
      return API.graphql(graphqlOperation(createRiddle, { input: riddle }))
        .then(({data: { createRiddle }}) => setRiddle(createRiddle))
        .catch(({errors}) => alert('error creating the Riddles'));
    }
    return alert('insert please');
  }

  const updateUserAnswer = ({ answer }) => { if(answer)  {
    return API.graphql(graphqlOperation(updateAnswer, { input: { id: answer.id, result: !answer.result }}))
      .then(() => getUsersAnswer().then(setUserAnswer))
      .catch(({errors}) => alert('Error updating the anser', errors[0].message))
  }}

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.adminContainer}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
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

export { Admin };
