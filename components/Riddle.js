import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InputRiddle } from './InputRiddle';

function Riddle({ riddle }) {
  if(riddle.expired) {
    return (
      <View>
        <View style={styles.solution}>
          <Text> Solution: {riddle.riddle} </Text>
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

export { Riddle };
