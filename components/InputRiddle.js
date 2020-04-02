import React, { useState, useEffect } from 'react';
import { TextInput, Image, StyleSheet, Text,View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { Input } from 'react-native-elements';

function InputRiddle({riddle}) {
  return (
    <View>
      <View style={styles.solution}>
        <Text> {riddle.riddle} </Text>
      </View>
      <Input
        placeholder="Inseristi la tua risposta"
        containerStyle={styles.input}
        multiline={true}
        underlineColorAndroid='transparent'
        blurOnSubmit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    //padding: 5,
  },
  input: {
    //margin: 8,
    borderRadius: 24,
    justifyContent: 'space-around',
    marginTop: 50,
  },
  solution: {
    margin: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export { InputRiddle };
