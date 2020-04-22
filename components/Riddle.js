import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { RankList } from './RankList';
import { UserListAnwsers } from './userLiveAnswers';
import MainTimer from './CountDown';
import CountDown from 'react-native-countdown-component';

function Timer() {
  return (
    <CountDown
      digitStyle={{backgroundColor: 'orange'}}
      digitTxtStyle={{color: 'white'}}
      until={10}
      timeToShow={['M', 'S']}
      timeLabels={{m: 'MM', s: 'SS'}}
      onFinish={() => alert('finished')}
      onPress={() => alert('hello')}
      size={15}
    />
  )
}

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text style={styles.boxSolution}>{riddle.solution} </Text>
      <RankList/>
    </React.Fragment>
  )
};

function Riddle({ riddle, user }) {
  if(!riddle) return null;
  const [countDown, setCountDown] = useState();

  const Game = () => (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={styles.timer}>
          <Text style={styles.riddle}>Riddle</Text>
          <Timer />
        </View>
        <Text style={styles.boxContainer}>{riddle.riddle}</Text>
        <Text style={styles.answer}>Answer</Text>
        {riddle.expired
          ? <Solution riddle={riddle} />
          : <InputRiddle riddle={riddle} user={user} />
        }
      </ScrollView>
      { !riddle.expired && <UserListAnwsers /> }
    </View>
  );

  return (
    <React.Fragment>
      {countDown
        ? <Game />
        : <MainTimer setCountDown={setCountDown} />
      }
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  timer: {
    display: 'flex',
    backgroundColor: '#5c4fa1',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riddle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  answer: {
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 25,
  },
  boxContainer: {
    fontSize: 16,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: '#5c4fa1',
    color: 'white',
  },
  boxSolution: {
    fontSize: 16,
    padding: 20,
  },
});

export { Riddle };
