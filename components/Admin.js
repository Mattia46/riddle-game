import React, { useState, useEffect } from 'react';
import { Input, Button, CheckBox } from 'react-native-elements';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { riddleByDate } from '../src/graphql/queries';
import { createRiddle, updateRiddle } from '../src/graphql/mutations';

function Admin({user}) {
  if(!user || user.name !== 'mattia') return null;

  const today = new Date().toISOString().split('T')[0]
  const init = { expired: false, date: today};
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
  }, []);

  const submit = () => {
    if(riddle.id) {
      return API.graphql(graphqlOperation(updateRiddle, { input: riddle }))
        .then(({data: { updateRiddle }}) => alert(JSON.stringify(updateRiddle)));
    }
    return API.graphql(graphqlOperation(createRiddle, { input: riddle }))
      .then(({data: { createRiddle }}) => alert(JSON.stringify(createRiddle)));
  };

  return (
    <React.Fragment>
      <View>
        <Text>Admin</Text>
        <Input
          placeholder="Domanda"
          containerStyle={styles.input}
          multiline={true}
          underlineColorAndroid='transparent'
          blurOnSubmit={true}
          value={riddle.riddle}
          onChangeText={e => setRiddle({...riddle, riddle: e})}
        />
        <Input
          placeholder="Risposta"
          containerStyle={styles.input}
          multiline={true}
          underlineColorAndroid='transparent'
          blurOnSubmit={true}
          value={riddle.solution}
          onChangeText={e => setRiddle({...riddle, solution: e})}
        />
        <CheckBox
          title="Expired"
          checked={riddle.expired}
          onPress={() => setRiddle({...riddle, expired: !riddle.expired})}
        />
        <Button title="Confirm" onPress={submit}>Set Expired</Button>
      </View>
      <ScrollView>
      </ScrollView>
    </React.Fragment>
  )
}

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

export { Admin };
