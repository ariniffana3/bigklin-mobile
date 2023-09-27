import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from '../screen/Home';
import Order from '../screen/Order';
import Recap from '../screen/Recap';
import Print from '../screen/Print';

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Order}
        name="Order"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Recap}
        name="Recap"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Print}
        name="Print"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
