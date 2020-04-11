import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { getUserAnswer } from '../components/shared';
import { ListItem } from 'react-native-elements'
import { Rating } from 'react-native-elements';

export default function RankScreen() {
  const [userResultsList, setUserResultsList] = useState([]);
  const initDate = '2020-04-12';
  const endDate = '2020-04-19';


  useEffect(() => {
    API.graphql(graphqlOperation(getUserAnswer,
      {filter:{result:{eq: true},date: {between:[initDate, endDate]}}}
    )).then(({data: { listUsers }}) => {
      if(listUsers && listUsers.items) {
        const newList = listUsers.items.map(x => ({
          name: x.name,
          avatar: x.avatar,
          id: x.id,
          result: x.answers.items.length
        }))
        const sortedList =  newList.sort((a,b) => (b.result - a.result));
        setUserResultsList(sortedList)
      }
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text style={styles.header}>Weekly Rank</Text>
      { userResultsList.map((user, index) => (
        <View key={index} style={styles.container}>
          <Avatar key={index}
            rounded
            size={50}
            source={{uri: user.avatar}}
            title={user.name}
            containerStyle={{marginRight: 50}}
          />
          <Rating
            readonly
            imageSize={25}
            ratingCount={5}
            startingValue={user.result}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    color: '#70c8b7',
  },
  container: {
    alignItems: 'center',
    borderBottomColor: '#B8B3A7',
    borderBottomWidth: 0.4,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginRight: 30,
    marginTop: 15,
  },
});

