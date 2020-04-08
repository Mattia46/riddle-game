import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Admin } from '../components/Admin';

function Welcome({user}) {
  if(user.name === 'mattia') return null;

  return (
    <React.Fragment>
      <Text>Hey {user?.name}</Text>
      <Text>Welcome to IndovinaLove</Text>
    </React.Fragment>
  );
};
export default function HomeScreen(props) {
  const [user, setUser] = useState({});
  if(!user) return null;

  useEffect(() => {
    if(props.user) {
      return setUser(props.user);
    };
  }, [props.user]);

  return (
    <React.Fragment>
      <Welcome user={user} />
      <Admin user={user} />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
