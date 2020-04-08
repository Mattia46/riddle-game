import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar, Badge } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { getUserAnswer, onCreateAnswer } from './shared';

function ShowBadge({user}) {
  if(!user.hasAnswered) return null;

  return <Badge
    containerStyle={{ position: 'absolute', top: -2, right: 2 }}
    status="success"
  />
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

  useEffect(() => {
    const onCreate = API.graphql(graphqlOperation(onCreateAnswer))
      .subscribe(data => updateUser(data.value.data.onCreateAnswer.user.id));

    API.graphql(graphqlOperation(getUserAnswer, {filter: { date: { eq:  today }}}))
      .then(({data}) => {
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
    <View style={styles.container}>
      { listUsers.map((user, index) => (
        <View key={index} style={styles.avatar}>
          <Avatar key={index}
            rounded
            containerStyle={{padding: 1, backgroundColor: "white" }}
            activeOpacity={0.4}
            size={30}
            source={{uri: user.avatar}}
            title={user.name}
          />
          <ShowBadge user={user}/>
        </View>
      )) }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'flex-end',
    padding: 20,
  },
  avatar: {
    display: 'flex',
    marginLeft: -5,
  },
});

export { UserListAnwsers }
