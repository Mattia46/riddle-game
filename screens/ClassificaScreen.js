import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { listUsersResults } from '../components/shared';
import { ListItem } from 'react-native-elements'
import { Rating, AirbnbRating } from 'react-native-elements';

export default function ClassificaScreen() {
  const [userResultsList, setUserResultsList] = useState([]);

  const getUserResults = () => API.graphql(graphqlOperation(listUsersResults,
    {filter:{result:{eq: false},date: {between:["2020-04-03", "2020-04-05"]}}}
  ));

  useEffect(() => {
    getUserResults().then(({data: { listUsers }}) => {
      console.log('>>>>>.', listUsers);
      if(listUsers && listUsers.items) {
        setUserResultsList(listUsers.items)
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text>Classifica Page</Text>
        </View>
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
    </View>
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});

