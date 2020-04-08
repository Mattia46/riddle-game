import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { getUserAnswer } from '../components/shared';
import { ListItem } from 'react-native-elements'
import { Rating, AirbnbRating } from 'react-native-elements';

export default function ClassificaScreen() {
  const [userResultsList, setUserResultsList] = useState([]);


  useEffect(() => {
    API.graphql(graphqlOperation(getUserAnswer,
      {filter:{result:{eq: false},date: {between:["2020-04-03", "2020-04-05"]}}}
    )).then(({data: { listUsers }}) => {
      if(listUsers && listUsers.items) {
        setUserResultsList(listUsers.items)
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      { userResultsList.map((user, index) => (
        <View key={index} style={styles.avatar}>
          <Avatar key={index}
            rounded
            size={50}
            source={{uri: user.avatar}}
            title={user.name}
          />
          <Rating
            type='heart'
            ratingCount={5}
            startingValue={user.answers.items.length}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  avatar: {
    display: 'flex',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

