import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { API, graphqlOperation } from 'aws-amplify';
import { styles } from './style';
import { getUsersAnswer } from '../utils';

const RankList = () => {
  const [playingUsersAnswers, setPlayingUserAnswers] = useState([]);
  const [notPlayingUsersAnswers, setNotPlayingUserAnswers] = useState([]);

  useEffect(() => {
    getUsersAnswer().then(user => {
      const hasAnswered = user.filter(user => user.hasAnswered === true).sort((a, b) => b.correct - a.correct);
      const notAnswered = user.filter(user => user.hasAnswered !== true);
      setPlayingUserAnswers(hasAnswered)
      setNotPlayingUserAnswers(notAnswered)
    });
  }, []);


  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      { playingUsersAnswers.map((user, index) => (
        <View style={styles.containerRankList} key={index}>
          <Avatar
            rounded size={45}
            source={{uri: user.avatar}}
            title={user.name}
          />
          <Icon
            name={user.correct ? 'check' : 'clear'}
            color="white"
            size={20}
            containerStyle={[styles.icon, user.correct ? {backgroundColor: "#50F403"} : {backgroundColor: "#F42E03"}]}
          />
          <Text style={styles.solution}>{user.solution}</Text>
        </View>
      )) }
      { notPlayingUsersAnswers.map((user, index) => (
        <View style={styles.containerRankList} key={index}>
          <Avatar
            rounded size={45}
            source={{uri: user.avatar}}
            title={user.name}
          />
          <Icon
            name={user.hasAnswered ? 'check' : 'clear'}
            color="white"
            size={20}
            containerStyle={[styles.icon, {backgroundColor: "grey"}]}
          />
          <Text style={styles.solution}>{user.solution}</Text>
        </View>
      )) }

    </ScrollView>
  )
};

export { RankList };
