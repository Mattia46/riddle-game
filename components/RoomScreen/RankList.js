import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { API, graphqlOperation } from 'aws-amplify';
import { getUserAnswer } from '../shared';
import { styles } from './style';
import { getNormaliseList } from '../utils';

const RankList = () => {
  const [usersAnswers, setUsersAnswers] = useState([]);
  const today = new Date().toISOString().split('T')[0]

  const getTodayUserAnswer = () => API.graphql(graphqlOperation(getUserAnswer, {filter: { date: { eq:  today }}}))
    .then(({data}) => setUsersAnswers(getNormaliseList(data)))
    .catch(err => alert('Error RankList getTodayUseranswer'));

  useEffect(() => {
    getTodayUserAnswer();
  }, []);


  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      { usersAnswers.map((user, index) => (
        <View style={styles.containerRankList} key={index}>
          <Avatar
            rounded size={50}
            source={{uri: user.avatar}}
            title={user.name}
          />
          <Icon
            name={user.answer ? 'check' : 'clear'}
            color="white"
            size={20}
            containerStyle={[styles.icon, user.answer ? {backgroundColor: "#50F403"} : {backgroundColor: "#F42E03"}]}
          />
          <Text style={styles.solution}>{user.solution}</Text>
        </View>
      )) }
    </ScrollView>
  )
};

export { RankList };
