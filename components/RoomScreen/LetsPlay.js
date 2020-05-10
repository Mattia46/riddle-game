import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import CountdownCircle from 'react-native-countdown-circle'
import CountDown from 'react-native-countdown-component';
import {AsyncStorage} from 'react-native';
import { setGameStartedToday } from '../utils';

function Timer({setShowDialog, time}) {
  return (
    <CountDown
      digitStyle={{backgroundColor: 'orange'}}
      digitTxtStyle={{color: 'white'}}
      until={time}
      timeToShow={['M', 'S']}
      timeLabels={{m: 'MM', s: 'SS'}}
      onFinish={() => setShowDialog(true)}
      size={15}
    />
  )
}

function TimerCircle({setIsGameStarted}) {
  const handler = async () => {
    setGameStartedToday();
    setIsGameStarted(true);
  };

  return <CountdownCircle
    seconds={5}
    radius={80}
    borderWidth={15}
    color="orange"
    bgColor="#fff"
    textStyle={{ fontSize: 50 }}
    onTimeElapsed={handler}
  />
}

function LetsPlayCounter({setIsGameStarted}) {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <View style={styles.container}>
      { showTimer
        ? <TimerCircle setIsGameStarted={setIsGameStarted}/>
        : <React.Fragment>
          <Text style={{fontSize: 30, color: 'white', marginBottom: 10}}>Ready to play?</Text>
          <Text style={{fontSize: 14, color: 'white'}}>If you finish within 15 min and get it right</Text>
          <Text style={{fontSize: 14, color: 'white'}}>you’ll get extra half point </Text>
          <Button
            onPress={() => setShowTimer(true)}
            containerStyle={styles.button}
            buttonStyle={{backgroundColor: 'orange'}}
            title="let's play" />
        </React.Fragment>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5c4fa1',
  },
  button: {
    width: 200,
    alignSelf: 'center',
    padding: 30,
  },
});

export { LetsPlayCounter, Timer };
