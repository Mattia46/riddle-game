import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Admin } from './Admin';
import { API, graphqlOperation } from 'aws-amplify';
import { listRiddles } from '../../src/graphql/queries';
import { onCreateRiddle } from '../../src/graphql/subscriptions';
import { Welcome } from './Welcome';
import { styles } from './style';

const HomeScreen = props => {
  const today = new Date().toISOString().split('T')[0]
  const [user, setUser] = useState({});
  const [isGameOn, setIsGameOn] = useState(false);

  if(!user) return null;

  const getTodayRiddle = () => API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}))
    .then(({data}) => {
      if(data.listRiddles.items[0]) {
        return setIsGameOn(true);
      }
    }).catch(err => alert('Error HomeScreen: getTodayRiddle'));

  useEffect(() => {
    const onCreateGame = API.graphql(graphqlOperation(onCreateRiddle))
      .subscribe({
        next: ({ value: { data: { onCreateRiddle }}}) => {
          if(onCreateRiddle.date == today) return setIsGameOn(true);
        },
        error: error => alert('Error HomeScreen: onCreateGame subscription')
      })
    getTodayRiddle();

    return () => onCreateGame.unsubscribe();
  }, []);


  useEffect(() => {
    if(props.user) {
      return setUser(props.user);
    };
  }, [props.user]);

  return (
    <View style={styles.container}>
      <Welcome
        user={user}
        navigate={props.navigation.navigate}
        isGameOn={isGameOn} />
      <Admin user={user} />
    </View>
  );
}

export default HomeScreen;
