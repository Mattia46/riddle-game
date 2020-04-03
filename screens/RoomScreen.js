import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../src/graphql/queries';
import { onCreateUser, onUpdateRiddle, onCreateRiddle } from '../src/graphql/subscriptions';
import { Riddle } from '../components/Riddle';

export default function RoomScreen() {
  const today = new Date().toISOString().split('T')[0]
  const [mattia, setMattia] = useState();

  useEffect(() => {
    const getRi = async () => {
      const { data } = await API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}));
      const obj = data.listRiddles?.items[0];
      await setMattia(33);
      console.log('riddle: ', mattia);
    };
    getRi();
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Connect
          query={graphqlOperation(listRiddles, {filter: { date: { eq: today }}})}
          subscription={graphqlOperation(onUpdateRiddle)}
          onSubscriptionMsg={(prev, { onUpdateRiddle }) => {
            console.log('onsdf', onUpdateRiddle, prev);
            console.log('onsdf', data, prev);
            return {listRiddles: {items: [onUpdateRiddle]}};
          }}
        >
          {({ data: { listRiddles }, loading, error }) => {
            if (error) return (<Text>Error</Text>);
            if (loading || !listRiddles) return (<Text>Loading...</Text>);
            //console.log('toa', listRiddles);
            return listRiddles.items && listRiddles.items.length > 0
              ? <Riddle riddle={listRiddles.items[0]} />
              : <Text> Next riddle at 10:00</Text>
          }}
        </Connect>

        <Connect
          subscription={graphqlOperation(onCreateRiddle)}
          onSubscriptionMsg={(prev, { onCreateRiddle }) => {
            if(onCreateRiddle.date == today) {
              return {listRiddles: {items: [onUpdateRiddle]}};
            }
            return;
          }}
        >
          {() => {}}
        </Connect>
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
