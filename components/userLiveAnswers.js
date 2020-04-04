import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar, Badge } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { getUserAnswer, onCreateAnswer } from './shared';

function ShowBadge({user}) {
  if(!user.hasAnswered) return null;

  return <Badge status="success" />
}

function UserListAnwsers() {
  const [listUsers, setListUsers] = useState([]);

  const today = new Date().toISOString().split('T')[0]
  const updateUser = userId => {
    const updatedList = listUsers
      .map(user => {
        if(user.id === userId) {
          user.hasAnswered = true;
          return user;
        }
        return user;
      });
    setListUsers(updatedList);
  };

  const getListUsers = () =>
    API.graphql(graphqlOperation(getUserAnswer, {filter: { date: { eq:  today }}}));

  const onCreate = API.graphql(graphqlOperation(onCreateAnswer)).subscribe(data =>
    updateUser(data.value.data.onCreateAnswer.user.id));


  useEffect(() => {
    getListUsers().then(({data}) => {
      const normaliseList = data.listUsers?.items.map(user => ({
        hasAnswered: user.answers?.items[0]?.userSolution ? true : false,
        name: user.name,
        avatar: user.avatar,
        id: user.id
      }));

      setListUsers([...normaliseList])
    });

    return () => onCreate.unsubscribe();
  }, []);

  return (
    <View>
      <Text>LIVE</Text>
      <View style={styles.container}>
        { listUsers.map((user, index) => (
          <View key={index} style={styles.avatar}>
            <Avatar key={index}
              rounded size={40}
              source={{
                uri:"https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg"
              }}
            />
            <ShowBadge user={user}/>
          </View>
        )) }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export { UserListAnwsers }
