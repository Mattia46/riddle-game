import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Badge, Icon } from "react-native-elements";

function ShowBadge({user}) {
  const status = user.answer ? 'success' : 'error';
  console.log('s\ta\ ', status);

  return <Badge
    containerStyle={{ top: -2, right: 15 }}
    status={status} value=""
  />
}

function Rank ({usersAnswers}) {
  const usersCorrect = usersAnswers.filter(item => item.answer === true);
  const usersWrong = usersAnswers.filter(item => item.answer !== true);

  return (
    <ScrollView>
      { usersAnswers.map((user, index) => (
        <View style={styles.container} key={index}>
          <Avatar
            rounded size={50}
            source={{
              uri:"https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg"
            }}
          />
          <Icon
            name={user.answer ? 'check' : 'clear'}
            color="white"
            size={20}
            containerStyle={[styles.icon, user.answer ? {backgroundColor: "#50F403"} : {backgroundColor: "#F42E03"}]}
          />
          <Text>{user.solution}</Text>
        </View>
      )) }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  icon: {
    top: -6,
    right: 20,
    borderRadius: 25,
    height: 20,
    width: 20,
  },
  correct: {
    backgroundColor: "#7CFC00",
    padding: 3,
    marginRight: 15,
  },
  wrong: {
    backgroundColor: "red",
    padding: 3,
    marginRight: 15,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    flex: 1,
  },
  winner: {
  },
});

export { Rank };
