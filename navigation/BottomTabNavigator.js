import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RoomScreen from '../screens/RoomScreen';
import ClassificaScreen from '../screens/ClassificaScreen';
import { StyleSheet, Text, View } from 'react-native';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Room"
        component={RoomScreen}
        options={{
          title: 'Room',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="logo-game-controller-b" />,
        }}
      />
      <BottomTab.Screen
        name="Classifica"
        component={ClassificaScreen}
        options={{
          title: 'Classifica',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-trophy" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  console.log('routename ', routeName, route);

  switch (routeName) {
    case 'Home':
      return 'Riddle App';
    case 'Room':
      return 'Riddle App';
    case 'Classifica':
      return 'Riddle App';
  }
}
