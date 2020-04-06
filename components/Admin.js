import React, { useState, useEffect } from 'react';
import { Input, Button, CheckBox } from 'react-native-elements';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { listUsers } from '../src/graphql/queries';
import { onCreateUser } from '../src/graphql/subscriptions';

function Admin({user}) {
  if(!user || user.name !== 'mattia') return null;
  const today = new Date().toISOString().split('T')[0]

  const [riddle, setRiddle] = useState({
    expired: false,
    date: today,
  });

  const submit = () => console.log('here', riddle);

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
