import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { listUsers } from '../src/graphql/queries';
import { onCreateUser } from '../src/graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';

export default function HomeScreen() {
  const [user, setUser] = useState({});
  //useEffect(() => {
    //const getUser = async () => {
      //console.log('user');
      //const users = await API.graphql(graphqlOperation(listUsers));
      //console.log('user', users, Auth.user.username);
      //const currentUser = users.data.listUsers.items.find(user => user.name == Auth.user.username)
      //console.log('user', currentUser);

      //return 'cia';
    //}
    //getUser()
  //}, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text>Welcome to IndovinaLove</Text>
        </View>
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
