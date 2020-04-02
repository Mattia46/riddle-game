import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodayAnswers, listUsersAnswers } from '../src/graphql/queries';
import { Avatar } from "react-native-elements";

const today = new Date().toISOString().split('T')[0]

function RankItem ({user}) {
  return (
    <View>
      <View>
        <Avatar alt={user.name} icon="https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg" />
      </View>
      <Text> {user.name} </Text>
      <Text> {user.avatar} </Text>
      <Text> {user.answer} </Text>
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
      <Text> Classifica: </Text>
      <Text> Correct </Text>
      <View style={{display: "flex", flexDirection: "row"}}>
        {
          usersCorrect.map((user, index) => (
            <Avatar key={index} rounded size={70} source={{uri:"https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg" }} />
          ))
        }
      </View>
      <Text style={{marginTop: 30, marginBottom: 20}}> Loosers </Text>
      <View style={{display: "flex"}}>
        {
          usersWrong.map((user, index) => (
            <View key={index} style={{ display: "flex", flexDirection: "row"}}>
              <Avatar label="cD" size={70} rounded source={{uri:"https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg" }} />
              <Text>ciao Bella soluzione del cavolo</Text>
            </View>
          ))
        }
      </View>
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
          if (error) return (<Text>Error</Text>);
          if (loading || !listUsers) return (<Text>Loading...</Text>);
          console.log('LIST', listUsers);
          return <Rank usersAnswers={listUsers ? listUsers.items : []}/>
        }}
      </Connect>
    </View>
  );
};

export { TodayRank };
