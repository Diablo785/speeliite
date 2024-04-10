import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './MainMenu';
import Game from './Game';
import Skins from './Skins';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Skins" component={Skins} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
