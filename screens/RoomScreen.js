import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../src/graphql/queries';
import { onCreateUser, onUpdateRiddle, onCreateRiddle } from '../src/graphql/subscriptions';
import { TodayRank } from '../components/Rank';
import { Riddle } from '../components/Riddle';

export default function RoomScreen() {
  const today = new Date().toISOString().split('T')[0]

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Connect
          query={graphqlOperation(listRiddles, {filter: { date: { eq: today }}})}
          onSubscriptionMsg={(prev, { onUpdateRiddle }) => {
            console.log('onsdf', onUpdateRiddle, prev);
            console.log('onsdf', data, prev);
            return {listRiddles: {items: [onUpdateRiddle]}};
          }}
        >
          {({ data: { listRiddles }, loading, error }) => {
            if (error) return (<Text>Error</Text>);
            if (loading || !listRiddles) return (<Text>Loading...</Text>);
            return listRiddles.items && listRiddles.items.length > 0
              ? <Riddle riddle={listRiddles.items[0]} />
              : <Text> Next riddle at 10:00</Text>
          }}
        </Connect>

        <Connect
          subscription={graphqlOperation(onCreateRiddle)}
          onSubscriptionMsg={(prev, { onCreateRiddle }) => {
            console.log('>.', prev, onCreateRiddle);
            return prev;
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
  solution: {
    margin: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'space-around',
    padding: 20,
  },
});
