import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RoomScreen from '../screens/RoomScreen';
import ClassificaScreen from '../screens/ClassificaScreen';
import { StyleSheet, Text, View, Image } from 'react-native';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route, user }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      >
        {props => <HomeScreen {...props} user={user} />}
      </BottomTab.Screen>
      <BottomTab.Screen name="Room"
        options={{
          title: 'Room',
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="logo-game-controller-b" />,
        }}
      >
        {props => <RoomScreen {...props} user={user} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Classifica"
        component={ClassificaScreen}
        options={{
          title: 'Classifica',
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-trophy" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return <Image
        source={require('../assets/images/indovinalove_main.png')}
        style={styles.logo}
      />
    case 'Room':
      return <Image
        source={require('../assets/images/indovinalove_main.png')}
        style={styles.logo}
      />
    case 'Classifica':
      return <Image
        source={require('../assets/images/indovinalove_main.png')}
        style={styles.logo}
      />
  }
}
const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 200,
  },
});
