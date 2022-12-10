import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, SelectLocation} from 'screens';
import TapNavigation from './TapNavigation';
import {PrivateRoutesTypes} from 'src/types/AllRoutes';

const PrivateRoutes = () => {
  const Stack = createNativeStackNavigator<PrivateRoutesTypes>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;

const styles = StyleSheet.create({});
