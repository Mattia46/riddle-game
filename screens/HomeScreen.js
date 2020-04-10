import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Admin } from '../components/Admin';
import { Auth } from 'aws-amplify';

function GameAction({active}) {
  const buttonText = "ciao";
  const text = active
    ? "Click on the button below to play today's game. Good luck!"
    : "When the button below is active, the game room is open and you can start playing";

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.messageText}> Are You ready to play? </Text>
      <Text style={styles.messageText}>{text}</Text>
      <Button
        backgroundColor="green"
        disabled={!active}
        onPress={() => alert('ciao')}
        containerStyle={styles.button}
        title={buttonText} />
    </View>
  );
};

function Welcome({user}) {
  if(user.name === 'mattia') return null;

  return (
    <React.Fragment>
      <Image
        source={require('../assets/images/logo_blue.png')}
        style={styles.logo}
      />
      <Text style={styles.name}>Hello {user?.name}</Text>
      <GameAction active={true} />
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
  button: {
    width: 200,
    alignSelf: 'center',
    padding: 30,
  },
  logo: {
    height: 150,
    width: 150,
  },
  gameContainer: {
    padding: 20,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  name: {
    fontSize: 30,
    padding: 20,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#5c4fa1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
