import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { API, graphqlOperation } from 'aws-amplify';
import { getUserAnswer } from '../shared';
import { styles } from './style';

function RankList () {
  const [usersAnswers, setUsersAnswers] = useState([]);
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    API.graphql(graphqlOperation(getUserAnswer, {filter: { date: { eq:  today }}}))
      .then(({data}) => {
        const normaliseList = data.listUsers?.items.map(user => ({
          answer: user.answers?.items[0]?.result || false,
          name: user.name,
          avatar: user.avatar,
          solution: user.answers?.items[0]?.userSolution || '',
          id: user.id
        })).sort((x, y) => y.answer - x.answer);

        setUsersAnswers(normaliseList)
      });
  }, []);


  const usersCorrect = usersAnswers.filter(item => item.answer === true);
  const usersWrong = usersAnswers.filter(item => item.answer !== true);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      { usersAnswers.map((user, index) => (
        <View style={styles.rankContainer} key={index}>
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
