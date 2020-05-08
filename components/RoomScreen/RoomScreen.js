import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../../src/graphql/queries';
import { onUpdateRiddle, onCreateRiddle } from '../../src/graphql/subscriptions';
import { Riddle } from './Riddle';
import { styles } from './style';

function NoRiddle({riddle}) {
  if(riddle) return null;

  return (
    <View  style={styles.noRiddle}>
      <Text style={{fontSize: 30, color: 'white', marginBottom: 10}}>Next riddle</Text>
      <Text style={{fontSize: 17, color: 'white'}}>Tomorrow at 10:00</Text>
    </View>
  );
}
export default function RoomScreen({user}) {
  const today = new Date().toISOString().split('T')[0]
  const [riddle, setRiddle] = useState();

  const getTodayRiddle = () => API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}))
    .then(({data}) => setRiddle(data.listRiddles?.items[0]))
    .catch(err => alert('Error RoomScreen getTodayRiddle'));

  const getOnCreateSub = () => API.graphql(graphqlOperation(onCreateRiddle)).subscribe({
      next: ({value: { data: { onCreateRiddle }}}) => {
        if(onCreateRiddle.date == today) return setRiddle(onCreateRiddle)
      },
      error: err => alert('Error RoomScreen onCreateRiddle sub')
    });
  const getOnUpdateSub = () => API.graphql(graphqlOperation(onUpdateRiddle)).subscribe({
      next: ({value: { data: { onUpdateRiddle }}}) => {
        if(onUpdateRiddle.date == today) return setRiddle(onUpdateRiddle)
      },
      error: err => alert('Error RoomScreen onUpdateRiddle sub')
    });

  useEffect(() => {
    const onCreateSub = getOnCreateSub();
    const onUpdateSub = getOnUpdateSub();
    getTodayRiddle();

    return () => {
      onCreateSub.unsubscribe();
      onUpdateSub.unsubscribe();
    }
  }, []);

  return (
    <React.Fragment>
      <Riddle riddle={riddle} user={user} />
      <NoRiddle riddle={riddle}/>
    </React.Fragment>
  );
}
