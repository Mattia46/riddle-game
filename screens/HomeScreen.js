import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { listUsers } from '../src/graphql/queries';
import { onCreateUser } from '../src/graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';

export default function HomeScreen(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text>Hey {user?.name}</Text>
          <Text>Welcome to IndovinaLove</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
