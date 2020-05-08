import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './style';

const GameAction = ({isGameOn, navigate}) => {
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

const Welcome = ({user, navigate, isGameOn}) => {
  if(user.name === 'mattia') return null;

  return (
    <React.Fragment>
      <Image
        source={require('../../assets/images/logo_blue.png')}
        style={styles.logo}
      />
      <Text style={styles.name}>Hello {user?.name}</Text>
      <GameAction isGameOn={isGameOn} navigate={navigate}/>
    </React.Fragment>
  );
};

export { Welcome }
