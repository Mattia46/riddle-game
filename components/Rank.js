import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodayAnswers, listUsersAnswers } from '../src/graphql/queries';

const today = new Date().toISOString().split('T')[0]

function RankItem ({user}) {
  return (
    <View>
      <Text> {user.name} </Text>
      <Text> {user.avatar} </Text>
      <Text> {user.answer} </Text>
      <Text>---------------</Text>
    </View>
  );
}
function Rank ({usersAnswers}) {
  const normaliseList = usersAnswers.map(user => ({
    answer: user.answers?.items[0]?.result || false,
    name: user.name,
    avatar: user.avatar,
    id: user.id
  })).sort((x, y) => y.answer - x.answer);

  const usersCorrect = normaliseList.filter(item => item.answer === true);
  const usersWrong = normaliseList.filter(item => item.answer !== true);

  return (
    <View>
      <Text>
        Classifica:
      </Text>
      {
        normaliseList.map((user, index) =>(
          <RankItem user={user} key={index}/>
        ))
      }
    </View>
  )
};

function TodayRank ({riddle}) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <View>
      <Connect
        query={graphqlOperation(listUsersAnswers, {filterAnswer: { date: { eq: today }}})}
      >
        {({ data: { listUsers }, loading, error }) => {
          if (error) return (<h3>Error</h3>);
          if (loading || !listUsers) return (<h3>Loading...</h3>);
          console.log('LIST', listUsers);
          return <Rank usersAnswers={listUsers ? listUsers.items : []}/>
        }}
      </Connect>
    </View>
  );
};

export { TodayRank };
