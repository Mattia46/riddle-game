import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { getUserAnswer } from '../components/shared';
import { ListItem } from 'react-native-elements'
import { Rating } from 'react-native-elements';

export default function ClassificaScreen() {
  const [userResultsList, setUserResultsList] = useState([]);
  const initDate = '2020-04-04';
  const endDate = '2020-04-11';


  useEffect(() => {
    API.graphql(graphqlOperation(getUserAnswer,
      {filter:{result:{eq: false},date: {between:[initDate, endDate]}}}
    )).then(({data: { listUsers }}) => {
      console.log('list', listUsers);
      if(listUsers && listUsers.items) {
        setUserResultsList(listUsers.items)
      }
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text>Classifica del {initDate} al {endDate}</Text>
      { userResultsList.map((user, index) => (
        <View key={index} style={styles.container}>
          <Avatar key={index}
            rounded
            size={50}
            source={{uri: user.avatar}}
            title={user.name}
            containerStyle={{marginRight: 20}}
          />
          <Rating
            readonly
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

