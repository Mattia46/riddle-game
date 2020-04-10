import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Admin } from '../components/Admin';
import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { listRiddles } from '../src/graphql/queries';

function GameAction({isGameOn, navigate}) {
  const text = isGameOn
    ? "Click on the button below to play today's game. Good luck!"
    : "When the button below is isGameOn, the game room is open and you can start playing";

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.messageText}> Are You ready to play? </Text>
      <Text style={styles.messageText}>{text}</Text>
      <Button
        disabled={!isGameOn}
        onPress={() => navigate('Room')}
        containerStyle={styles.button}
        buttonStyle={{backgroundColor: 'orange'}}
        title="let's play" />
    </View>
  );
};

function Welcome({user, navigate, isGameOn}) {
  if(user.name === 'mattia') return null;

  return (
    <React.Fragment>
      <Image
        source={require('../assets/images/logo_blue.png')}
        style={styles.logo}
      />
      <Text style={styles.name}>Hello {user?.name}</Text>
      <GameAction isGameOn={isGameOn} navigate={navigate}/>
    </React.Fragment>
  );
};
export default function HomeScreen(props) {
  const today = new Date().toISOString().split('T')[0]
  const [user, setUser] = useState({});
  const [isGameOn, setIsGameOn] = useState(false);

  if(!user) return null;

  useEffect(() => {
    API.graphql(graphqlOperation(listRiddles, { filter: { date: { eq: today }}}))
      .then(({data}) => {
        if(data.listRiddles.items[0]) {
          return setIsGameOn(true);
        }
      });
  }, []);


  useEffect(() => {
    if(props.user) {
      return setUser(props.user);
    };
  }, [props.user]);

  return (
    <View style={styles.container}>
      <Welcome
        user={user}
        navigate={props.navigation.navigate}
        isGameOn={isGameOn} />
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
    width: 320,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  name: {
    fontSize: 25,
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
