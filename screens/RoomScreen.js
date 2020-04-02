import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../src/graphql/queries';
import { onCreateUser, onUpdateRiddle } from '../src/graphql/subscriptions';
import { TodayRank } from '../components/Rank';


function Riddle({ riddle }) {
  if(riddle.expired) {
    return (
      <View>
        <Text> Solution: {riddle.solution} </Text>
        <Text>---------------</Text>
        <TodayRank />
      </View>
    );
  }

  return (
    <View>
      <Text> ID: {riddle.id}</Text>
      <Text>Today: {riddle.date}</Text>
      <Text>Riddle: {riddle.riddle}</Text>
    </View>
  )};

export default function RoomScreen() {
  const today = new Date().toISOString().split('T')[0]

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text>Room page</Text>

          <Connect
            query={graphqlOperation(listRiddles, {filter: { date: { eq: today }}})}
            subscription={graphqlOperation(onUpdateRiddle)}
            onSubscriptionMsg={(prev, { onUpdateRiddle }) => {
              console.log('onsdf', onUpdateRiddle, prev);
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
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
