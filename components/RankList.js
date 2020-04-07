import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from "react-native-elements";
import { ListItem } from 'react-native-elements'

function Rank ({usersAnswers}) {
  const usersCorrect = usersAnswers.filter(item => item.answer === true);
  const usersWrong = usersAnswers.filter(item => item.answer !== true);

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

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4286f4',
    flex: 1,
  },
  winner: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 15,
    padding: 10,
    flexDirection: 'row',
  },
});

export { Rank };
