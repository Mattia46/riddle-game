import * as React from 'react';
import { Platform, Button, Image, Input, StatusBar, Text, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { listUsers } from './src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'; // or 'aws-amplify-react-native';
import { Storage } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

const Stack = createStackNavigator();

function AddAvatar() {
  const [avatar, setAvatar] = React.useState();
  const handleChange = e => {
    const file = e.target.file[0]
    setAvatar({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    });
  }
  const saveFile = () => {
    Storage.put(avatar.filename, avatar.file)
      .then(() => {
        console.log('success saved picture');
      })
      .catch(err => console.log('ERR', err))
  }
  return (
    <View>
      <Text>UploadIMAGE</Text>
    </View>
  )
};

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [existingUser, setExistingUser] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    async function getUser() {
      const users = await API.graphql(graphqlOperation(listUsers));
      const currentUser = users.data.listUsers.items.find(user => user.name == Auth.user.username)
      await setExistingUser(currentUser);
    }
    getUser()
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else if (!existingUser) {
    return <View>
      <Text>Please upload picture</Text>
      <AddAvatar />
    </View>
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withAuthenticator(App, { includeGreetings: true})
