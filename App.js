import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './MainMenu';
import LandingPage from './LandingPage';
import Game from './Game';
import Skins from './Skins';
import Login from './Login';
import Register from './Register';
import Register from './Info';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Skins" component={Skins} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
