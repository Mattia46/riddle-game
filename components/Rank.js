import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { Rank } from './RankList';
import { getUserAnswer } from './shared';


function TodayRank () {
  const [listUsers, setListUsers] = useState([]);
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

        setListUsers(normaliseList)
      });
  }, []);

  return (
    <Rank usersAnswers={listUsers ? listUsers : []}/>
  );
};

export { TodayRank };
