import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar } from "react-native-elements";
import { getUserAnswer, onCreateAnswer } from './shared';

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
        hasAnswered: user.answers?.items[0]?.result ? true : false,
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
      <View style={styles.winner}>
        { listUsers.map((user, index) => (
          <Avatar key={index}
            containerStyle={{padding: 3, backgroundColor: "#7CFC00", marginRight: 15,}}
            rounded size={40}
            source={{
              uri:"https://img1.looper.com/img/gallery/the-5-best-and-5-worst-things-about-the-hulk-of-the-mcu/intro-1557524944.jpg"
            }}
          />
        )) }
      </View>

    </View>
  )
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

export { UserListAnwsers }
