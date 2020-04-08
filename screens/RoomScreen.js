import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers, listRiddles } from '../src/graphql/queries';
import { onUpdateRiddle, onCreateRiddle } from '../src/graphql/subscriptions';
import { Riddle } from '../components/Riddle';

function NoRiddle({riddle}) {
  if(riddle) return null;

  return (
    <View  style={styles.noRiddle}>
      <Text style={{fontSize: 30}}>Next riddle at 10:00</Text>
    </View>
  );
}
export default function RoomScreen({user}) {
  const today = new Date().toISOString().split('T')[0]
  const [riddle, setRiddle] = useState();

  useEffect(() => {
    const onCreateSub = API.graphql(graphqlOperation(onCreateRiddle))
      .subscribe(({value: { data: { onCreateRiddle }}}) => {
        if(onCreateRiddle.date == today) {
          return setRiddle(onCreateRiddle);
        }
      });
    const onUpdateSub = API.graphql(graphqlOperation(onUpdateRiddle))
      .subscribe(({value: { data: { onUpdateRiddle }}}) => {
        if(onUpdateRiddle.date == today) {
          return setRiddle(onUpdateRiddle)
        }
      });
    API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}))
      .then(({data}) => setRiddle(data.listRiddles?.items[0]));

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

const styles = StyleSheet.create({
  noRiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
