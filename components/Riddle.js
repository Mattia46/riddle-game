import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';
import { TodayRank } from './Rank';

function Riddle({ riddle }) {
  if(!riddle) return null;
  if(riddle.expired) {
    return (
      <View>
        <View style={styles.solution}>
          <Text> Riddle: {riddle.riddle} </Text>
        </View>
        <View style={styles.solution}>
          <Text> Solution: {riddle.solution} </Text>
        </View>
        <TodayRank />
      </View>
    );
  }

  return <InputRiddle riddle={riddle} />;
};

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
