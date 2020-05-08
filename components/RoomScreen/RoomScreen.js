import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../../src/graphql/queries';
import { Riddle } from './Riddle';
import { styles } from './style';

function NoRiddle({riddle, getTodayRiddle}) {
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
  const [refreshing, setRefreshing] = useState(false);

  const getTodayRiddle = () => API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}))
    .then(({data}) => setRiddle(data.listRiddles?.items[0]))
    .catch(err => alert('Error RoomScreen getTodayRiddle'));

  const onRefresh = () => {
    getTodayRiddle();
    setRefreshing(false);
  };

  useEffect(() => {
    getTodayRiddle();
  }, []);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <Riddle riddle={riddle} user={user} />
      <NoRiddle riddle={riddle}/>
    </ScrollView>
  );
}
