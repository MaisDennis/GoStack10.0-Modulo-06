import * as React from 'react';
// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

/*
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
*/

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'Usuários',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: 'Stars',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

/*
  <Stack.Screen>
{props => {
  <Stack.Screen
    name="User"
    component={User}
    options={{ title: props.route }}
  />;
}}
</Stack.Screen>


 <Stack.Screen
        name="User"
        component={User}
        options={{
          title: 'Hello World',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#7159c1',
          },
        }}
      ></Stack.Screen>
*/
