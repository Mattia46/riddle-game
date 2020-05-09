import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Admin } from './Admin';
import { API, graphqlOperation } from 'aws-amplify';
import { getTodayRiddle } from '../utils';
import { onCreateRiddle } from '../../src/graphql/subscriptions';
import { Welcome } from './Welcome';
import { styles } from './style';
import { getUserFromLocal } from '../utils';

const HomeScreen = ({ navigation }) => {
  const today = new Date().toISOString().split('T')[0]
  const [user, setUser] = useState({});
  const [isGameOn, setIsGameOn] = useState(false);

  useEffect(() => {
    const onCreateGame = API.graphql(graphqlOperation(onCreateRiddle))
      .subscribe({
        next: ({ value: { data: { onCreateRiddle }}}) => {
          if(onCreateRiddle.date == today) return setIsGameOn(true);
        },
        error: error => alert('Error HomeScreen: onCreateGame subscription')
      })
    getUserFromLocal().then(user => setUser(user));
    getTodayRiddle()
      .then(data => { if(data) { return setIsGameOn(true) }})
      .catch(err => alert('Error HomeScreen: getTodayRiddle'));

    return () => onCreateGame.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Welcome
        user={user}
        navigate={navigation.navigate}
        isGameOn={isGameOn} />
      <Admin user={user} />
    </View>
  );
}

export default HomeScreen;
