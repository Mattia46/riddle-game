import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Icon } from "react-native-elements";

function Rank ({usersAnswers}) {
  const usersCorrect = usersAnswers.filter(item => item.answer === true);
  const usersWrong = usersAnswers.filter(item => item.answer !== true);

  return (
    <ScrollView>
      { usersAnswers.map((user, index) => (
        <View style={styles.container} key={index}>
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
  container: {
    borderBottomColor: '#B8B3A7',
    borderBottomWidth: 0.4,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 30,
  },
});

export { Rank };
