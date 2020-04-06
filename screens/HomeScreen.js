import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Admin } from '../components/Admin';

export default function HomeScreen(props) {
  const [user, setUser] = useState({});
  if(!user) return null;

  useEffect(() => {
    if(props.user) {
      return setUser(props.user);
    };
  }, [props.user]);

  return (
    <View style={styles.container}>
      <Text>Hey {user?.name}</Text>
      <Text>Welcome to IndovinaLove</Text>
      <Admin user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 20,
  },
});
