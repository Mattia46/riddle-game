import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodayAnswers, listUsersAnswers } from '../src/graphql/queries';
import { Avatar } from "react-native-elements";
import { Rank } from './RankList';
import { getUserAnswer } from './shared';


function TodayRank () {
  const [listUsers, setListUsers] = useState([]);

  const today = new Date().toISOString().split('T')[0]
  const getListUsers = () =>
    API.graphql(graphqlOperation(getUserAnswer, {filter: { date: { eq:  today }}}));

  useEffect(() => {
    getListUsers().then(({data}) => {
      const normaliseList = data.listUsers?.items.map(user => ({
        answer: user.answers?.items[0]?.result || false,
        name: user.name,
        avatar: user.avatar,
        solution: user.answers?.items[0]?.userSolution || '',
        id: user.id
      })).sort((x, y) => y.answer - x.answer);

      setListUsers(normaliseList)
    });
  }, []);

  return (
    <View>
      <Rank usersAnswers={listUsers ? listUsers : []}/>
    </View>
  );
};

export { TodayRank };
