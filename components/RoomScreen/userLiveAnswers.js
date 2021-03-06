import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Avatar, Badge } from "react-native-elements";
import { onCreateAnswer } from '../shared';
import { styles } from './style';
import { getUsersAnswer } from '../utils';

function ShowBadge({user}) {
  if(!user.hasAnswered) return null;

  return <Badge
    containerStyle={{ position: 'absolute', top: -2, right: 2 }}
    status="success"
  />
}

const UserListAnwsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const latestUpdateUser = React.useRef(null);

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
  latestUpdateUser.current = updateUser;

  useEffect(() => {
    getUsersAnswer().then(setListUsers);
    const onCreate = API.graphql(graphqlOperation(onCreateAnswer))
      .subscribe({
        next: data => latestUpdateUser.current(data.value.data.onCreateAnswer.user.id),
        error: err => alert('Error LiveUser onCreateAnswer')
      });
    return () => onCreate.unsubscribe();
  }, []);

  return (
    <View style={styles.containerLive}>
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

export { UserListAnwsers }
