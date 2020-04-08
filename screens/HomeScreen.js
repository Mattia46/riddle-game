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
    <View style={{backgroundColor: 'white'}}>
      <Welcome user={user} />
      <Admin user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 250,
    width: 200,
    //resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
