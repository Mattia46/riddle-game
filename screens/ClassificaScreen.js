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
    <React.Fragment>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        { userResultsList.map((user, index) => (
          <View key={index} style={{display: 'flex', flexDirection: 'row' }}>
            <ListItem
              title={user.name}
              leftAvatar={{
                containerStyle: {marginLeft: 10, padding: 3},
                size: 50,
                source: { uri: "https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg" }
              }}
            />
            <Rating
              type='heart'
              ratingCount={5}
              startingValue={user.answers.items.length}
            />
          </View>
        ))}
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

