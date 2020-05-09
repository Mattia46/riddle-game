import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { getTodayRiddle } from '../utils';
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
  const [riddle, setRiddle] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const init = () => getTodayRiddle()
    .then(setRiddle)
    .catch(err => console.log('Error RoomScreen getTodayRiddle', err));

  const onRefresh = () => {
    init();
    setRefreshing(false);
  };

  useEffect(() => {
    init();
    console.log('ridle', riddle);
  }, []);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <Riddle riddle={riddle} />
      <NoRiddle riddle={riddle}/>
    </ScrollView>
  );
}
