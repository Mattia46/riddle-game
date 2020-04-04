import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Connect } from "aws-amplify-react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodayAnswers, listUsersAnswers } from '../src/graphql/queries';
import { Avatar } from "react-native-elements";
import { ListItem } from 'react-native-elements'
