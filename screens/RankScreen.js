import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar, Rating } from "react-native-elements";
import { getUserAnswer } from '../components/shared';
import { normaliseUserList } from '../components/utils';


function getWeekDates() {
  const today = new Date();
  const monthDay = today.getDate();
  let month = today.getMonth() + 1;
  const weekDay = today.getDay();
  const year = today.getFullYear();

  if(month < 10) {
    month = `0${month}`;
  }

  const initDay = monthDay < 10
    ? `0${monthDay - weekDay}`
    : `${monthDay - weekDay}`;

  const initWeekDay = `${year}-${month}-${initDay}`
  const endWeekDay = `${year}-${month}-${monthDay + (7 - weekDay)}`
  return [initWeekDay, endWeekDay]
};

export default function RankScreen() {
  const [userResultsList, setUserResultsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [initDate, endDate] = getWeekDates();
  const getFilter = () => ({ filter: {result: {eq: true}, date: {between:[initDate, endDate]}}})

  const getAnswers = () => API.graphql(graphqlOperation(getUserAnswer, getFilter()))
    .then(({data: { listUsers: { items }}}) => setUserResultsList(normaliseUserList(items).sort((a, b) => b.result = a.result)))
    .catch(err => alert('Error RankScreen: getUserAnswers'));

  const onRefresh = () => {
    getAnswers();
    setRefreshing(false);
  };

  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
    >
      { userResultsList.map((user, index) => (
        <View key={index} style={styles.container}>
          <Avatar key={index}
            rounded
            size={50}
            source={{uri: user.avatar}}
            title={user.name}
            containerStyle={{marginRight: 50}}
          />
          <Rating
            readonly
            imageSize={25}
            ratingCount={5}
            startingValue={user.result}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    color: '#70c8b7',
  },
  container: {
    alignItems: 'center',
    borderBottomColor: '#B8B3A7',
    borderBottomWidth: 0.4,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 30,
    marginTop: 15,
  },
});

