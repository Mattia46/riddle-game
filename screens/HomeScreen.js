import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Admin } from '../components/Admin';

function Welcome({user}) {
  if(user.name === 'mattia') return null;

  return (
    <React.Fragment>
      <Image
        source={require('../assets/images/indovinalove_logo_01.png')}
        style={styles.logo}
      />
      <Text style={styles.name}>Hello {user?.name}</Text>
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
    <View style={styles.container}>
      <Welcome user={user} />
      <Admin user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
  },
  name: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    color: '#70c8b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
