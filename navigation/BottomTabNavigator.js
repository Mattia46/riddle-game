import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RoomScreen from '../screens/RoomScreen';
import RankScreen from '../screens/RankScreen';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Auth } from 'aws-amplify';

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
        name="Rank"
        component={RankScreen}
        options={{
          title: 'Rank',
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
    case 'Rank':
      return (
        <View style={styles.container} >
          <Image
            source={require('../assets/images/indovinalove_main.png')}
            style={styles.logo}
          />
          <Button
            buttonStyle={{backgroundColor: '#5c4fc1'}}
            containerStyle={styles.button}
            icon={
              <Icon
                name="sign-out"
                size={15}
                color="white"
              />
            }
            onPress={() => Auth.signOut()} />
        </View>
      )
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
  logo: {
    alignSelf: 'center',
    height: 30,
    width: 200,
  },
});
