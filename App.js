// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './screens/LandingPage';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Wallhaven from './screens/Wallhaven';
import WallhavenImageViewer from './screens/WallhavenImageViewer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'black' } }}>
        <Stack.Screen
          name='Wallhaven'
          component={Wallhaven}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='WallhavenImageViewer'
          component={WallhavenImageViewer}
          options={{ headerShown: false, backgroundColor: 'black' }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='LandingPage'
          component={LandingPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Register'
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
