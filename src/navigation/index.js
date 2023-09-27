import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

import SplashScreen from '../screen/SplashScreen';
import AuthScreen from './auth';
import AppScreen from './app';

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AppScreen"
          component={AppScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainStackNavigator;
