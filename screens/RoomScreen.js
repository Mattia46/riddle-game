import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../src/graphql/queries';
import { onCreateUser, onUpdateRiddle, onCreateRiddle } from '../src/graphql/subscriptions';
import { Riddle } from '../components/Riddle';

function NoRiddle({riddle}) {
  if(riddle) return null;

  return (
    <View>
      <Text>Next riddle at 10:00</Text>
    </View>
  );
}
export default function RoomScreen() {
  const today = new Date().toISOString().split('T')[0]
  const [riddle, setRiddle] = useState();

  const onCreate = API.graphql(graphqlOperation(onCreateRiddle))
  const onUpdate = API.graphql(graphqlOperation(onUpdateRiddle))
  const getTodayRiddle = () => API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}));


  useEffect(() => {
    const onCreateSub = onCreate.subscribe(data => {
      const tmp = data.value.data.onCreateRiddle;
      if(tmp.date == today) {
        setRiddle(tmp);
      }
    });
    const onUpdateSub = onUpdate.subscribe(data => {
      const tmp = data.value.data.onUpdateRiddle;
      if(tmp.date == today) {
        setRiddle(tmp);
      }
    });
    getTodayRiddle().then(riddle => setRiddle(riddle.data.listRiddles?.items[0]));

    return () => {
      onCreateSub.unsubscribe();
      onUpdateSub.unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Riddle riddle={riddle} />
        <NoRiddle riddle={riddle} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
