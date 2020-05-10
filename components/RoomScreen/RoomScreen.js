import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { getTodayRiddle, getIsGameStarted } from '../utils';
import { Game } from './Riddle';
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

const RoomScreen = ({user}) => {
  const [riddle, setRiddle] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState();

  const init = () => {
    getTodayRiddle().then(setRiddle);
    getIsGameStarted().then(setIsGameStarted);
  };
  const onRefresh = () => {
    setRefreshing(false);
    init();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <Game
        riddle={riddle}
        isGameStarted={isGameStarted}
        setIsGameStarted={setIsGameStarted}
      />
      <NoRiddle riddle={riddle}/>
    </ScrollView>
  );
}

export default RoomScreen;
