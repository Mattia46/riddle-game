import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { TodayRank } from './Rank';

function Solution({riddle}) {
  return (
    <React.Fragment>
      <Text> Solution: {riddle.solution} </Text>
      <TodayRank riddle={riddle}/>
    </React.Fragment>
  )
};

function Riddle({ riddle, user }) {
  if(!riddle) return null;

  return (
    <React.Fragment>
      <Text> Riddle: {riddle.riddle} </Text>
      {riddle.expired
        ? <Solution riddle={riddle} />
        : <InputRiddle riddle={riddle} user={user} />
      }
    </React.Fragment>
  );
}


const styles = StyleSheet.create({
  solution: {
    margin: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'space-around',
    padding: 20,
  },
});
export { Riddle };
