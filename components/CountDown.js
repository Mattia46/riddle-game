import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import CountdownCircle from 'react-native-countdown-circle'

function TimerCircle({setCountDown}) {
  return <CountdownCircle
    seconds={5}
    radius={80}
    borderWidth={15}
    color="orange"
    bgColor="#fff"
    textStyle={{ fontSize: 50 }}
    onTimeElapsed={() => setCountDown(Date.now())}
  />
}

function CountDown({setCountDown}) {
  const [showTimer, setShowTimer] = useState(false);
  return (
    <View style={styles.container}>
      { showTimer
        ? <TimerCircle setCountDown={setCountDown}/>
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

export default CountDown;
