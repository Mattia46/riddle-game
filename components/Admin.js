import React, { useState, useEffect } from 'react';
import { Input, Button, CheckBox } from 'react-native-elements';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar } from "react-native-elements";
import { riddleByDate } from '../src/graphql/queries';
import { getUserAnswer } from './shared';
import { createRiddle, updateRiddle } from '../src/graphql/mutations';
import { TodayRank } from './Rank';

function Admin({user}) {
  if(!user || user.name !== 'mattia') return null;

  const windowWidth = Dimensions.get('window').width;
  const today = new Date().toISOString().split('T')[0]
  const init = { expired: false, date: today};
  const [userAnswer, setUserAnswer] = useState([]);
  const [riddle, setRiddle] = useState({
    expired: false,
    date: today,
  });

  useEffect(() => {
    API.graphql(graphqlOperation(riddleByDate, { date: today }))
      .then(({data: { riddleByDate: { items }}}) => {
        if(items.length > 0) {
          return setRiddle(items[0]);
        }
        return setRiddle(init);
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
  }, []);

  const submit = () => {
    if(riddle.id) {
      return API.graphql(graphqlOperation(updateRiddle, { input: riddle }))
        .then(({data: { updateRiddle }}) => alert(JSON.stringify(updateRiddle)));
    }
    if(!riddle.riddle) return alert('add riddle and solution');
    return API.graphql(graphqlOperation(createRiddle, { input: riddle }))
      .then(({data: { createRiddle }}) => alert(JSON.stringify(createRiddle)));
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Input
          placeholder="Domanda"
          containerStyle={styles.input}
          underlineColorAndroid='transparent'
          blurOnSubmit={true}
          value={riddle.riddle}
          onChangeText={e => setRiddle({...riddle, riddle: e})}
        />
        <Input
          placeholder="Risposta"
          containerStyle={styles.input}
          underlineColorAndroid='transparent'
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
          <Button title="Confirm" onPress={submit}>Set Expired</Button>
          <Button title="Update Answers" onPress={() => alert(windowWidth)}>Set Expired</Button>
        </View>
      </React.Fragment>
      <ScrollView>
        { userAnswer.map((user, index) => (
          <View key={index} style={{display: 'flex', flexDirection: 'row'}}>
            <Avatar
              rounded size={60}
              source={{
                uri:"https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg"
              }}
            />
            <Text style={{width: 150, marginLeft: 5}}>{user.answer?.userSolution}</Text>
            <CheckBox
              containerStyle={{width: 120}}
              title="correct"
              checked={user.answer?.result}
              onPress={() => setRiddle({...riddle, expired: !riddle.expired})}
            />
          </View>
        ))}
      </ScrollView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
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
