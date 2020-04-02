import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { listUsers } from '../src/graphql/queries';
import { onCreateUser } from '../src/graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';

export default function HomeScreen() {
  const ListView = ({ users }) => (
    <View>
        {users.map(user => <Text key={user.id}>{user.name} ({user.id})</Text>)}
    </View>
  );
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text>Welcome to IndovinaLove</Text>
        </View>

      <Connect
        query={graphqlOperation(listUsers)}
        subscription={graphqlOperation(onCreateUser)}
        onSubscriptionMsg={(prev, { onCreateUser }) => {
          prev.listUsers.items.push(onCreateUser);
          return prev;
        }}
      >
        {({ data: { listUsers }, loading, error }) => {
          if (error) return (<Text>Error</Text>);
          if (loading || !listUsers) return (<Text>Loading...</Text>);
          return (<ListView users={listUsers ? listUsers.items : []} />);
        }}
      </Connect>
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

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
