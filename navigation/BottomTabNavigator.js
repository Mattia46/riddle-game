import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../components/HomeScreen/HomeScreen';
import RoomScreen from '../screens/RoomScreen';
import RankScreen from '../screens/RankScreen';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="logo-game-controller-b" />,
        }}
      >
        {props => <RoomScreen {...props} user={user} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Rank"
        component={RankScreen}
        options={{
          title: 'Rank',
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
    case 'Rank':
      return <Image
        source={require('../assets/images/indovinalove_main.png')}
        style={styles.exitLogo}
      />
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    //flex: 1,
  },
  button: {
    width: 20,
    height: 30,
    alignSelf: 'flex-end',
  },
  exitLogo: {
    alignSelf: 'center',
    height: 35,
    width: 200,
  },
  logo: {
    alignSelf: 'center',
    height: 35,
    top: -10,
    width: 200,
  },
});
