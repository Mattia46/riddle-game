import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodayAnswers, listUsersAnswers } from '../src/graphql/queries';
import { Avatar } from "react-native-elements";
import { ListItem } from 'react-native-elements'

function Rank ({usersAnswers}) {
  const normaliseList = usersAnswers.map(user => ({
    answer: user.answers?.items[0]?.result || false,
    name: user.name,
    avatar: user.avatar,
    solution: user.answers?.items[0]?.userSolution || '',
    id: user.id
  })).sort((x, y) => y.answer - x.answer);

  const usersCorrect = normaliseList.filter(item => item.answer === true);
  const usersWrong = normaliseList.filter(item => item.answer !== true);

  return (
    <View style={styles.container}>
      <View style={styles.winner}>
        { usersCorrect.map((user, index) => (
          <Avatar key={index}
            containerStyle={{padding: 3, backgroundColor: "#7CFC00", marginRight: 15,}}
            rounded size={60}
            source={{
              uri:"https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg"
            }}
          />
        )) }
      </View>
          { usersWrong.map((user, index) => (
            <ListItem
              key={index}
              leftAvatar={{
                containerStyle: {marginLeft: 10, padding: 3, backgroundColor: "#FF0000"},
                size: 50,
                source: { uri: "https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg" }
              }}
              title={user.solution}
              bottomDivider
            />
          ))}
    </View>
  )
};
const getUserAnswer = /* GraphQL */ `
  query ListUserAnswer(
    $filter: ModelAnswerFilterInput
  ) {
  listUsers {
    items {
      name avatar id
      answers(filter: $filter){
        items{
          date
          userSolution
          result
        }
      }
  	}
  }
}`;

function TodayRank () {
  const today = new Date().toISOString().split('T')[0]

  return (
    <View>
      <Connect query={graphqlOperation(getUserAnswer, {filter: { date: { eq:  today }}})}>
        {({data}, loading, error) => {
          if (error) return (<Text>Error</Text>);
          if (loading || !data.listUsers) return (<Text>Loading...</Text>);
          return <Rank usersAnswers={data.listUsers ? data.listUsers.items : []}/>
        }}
      </Connect>
    </View>
  );
};

const styles = StyleSheet.create({
  winner: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 15,
    padding: 10,
    flexDirection: 'row',
  },
});

export { TodayRank };
