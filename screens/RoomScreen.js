import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../src/graphql/queries';
import { onUpdateRiddle, onCreateRiddle } from '../src/graphql/subscriptions';
import { Riddle } from '../components/Riddle';

function NoRiddle({riddle}) {
  if(riddle) return null;

  return (
    <View>
      <Text>Next riddle at 10:00</Text>
    </View>
  );
}
export default function RoomScreen({user}) {
  const today = new Date().toISOString().split('T')[0]
  const [riddle, setRiddle] = useState();

  useEffect(() => {
    const onCreateSub = API.graphql(graphqlOperation(onCreateRiddle))
      .subscribe(({value: { data: { onCreateRiddle }}}) => {
        if(onCreateRiddle.date == today) {
          return setRiddle(onCreateRiddle);
        }
      });
    const onUpdateSub = API.graphql(graphqlOperation(onUpdateRiddle))
      .subscribe(({value: { data: { onUpdateRiddle }}}) => {
        if(onUpdateRiddle.date == today) {
          return setRiddle(onUpdateRiddle)
        }
      });
    API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}))
      .then(({data}) => setRiddle(data.listRiddles?.items[0]));

    return () => {
      onCreateSub.unsubscribe();
      onUpdateSub.unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Riddle riddle={riddle} user={user} />
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
