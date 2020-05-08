import * as React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createUser } from './src/graphql/mutations';
import { userByName } from './src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'; // or 'aws-amplify-react-native';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import BottomTabNavigator from './navigation/BottomTabNavigator';
const Stack = createStackNavigator();

async function createNewUser(username) {
  const { data } = await API.graphql(graphqlOperation(createUser, { input: { name: username }}));
  return data.createUser;
};

function App(props) {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    async function getUser() {
      const {data} = await API.graphql(graphqlOperation(userByName, {name: Auth.user.username}));
      let currentUser = data.userByName?.items[0];
      if(!currentUser) {
        currentUser = await createNewUser(Auth.user.username);
      }
      setUser(currentUser);
    }
    getUser()
  }, []);

    return (
      <React.Fragment>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#5c4fa1' }}} >
            <Stack.Screen name="Home">
              {props => <BottomTabNavigator {...props} user={user}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </React.Fragment>
    );
  }
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withAuthenticator(App)
//export default withAuthenticator(App, { includeGreetings: true})
