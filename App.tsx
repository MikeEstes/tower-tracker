import React from 'react';

import { Provider } from 'jotai';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './src/screens/LandingScreen';
import UpgradeScreen from './src/screens/UpgradeScreen';
import UltimateWeaponsScreen from './src/screens/UltimateWeaponsScreen';
import CardsScreen from './src/screens/CardsScreen';
import LabsScreen from './src/screens/LabsScreen';

// Define the navigation param list for type safety
export type RootStackParamList = {
  Landing: undefined;
  AttackUpgrade: { type: 'Attack' };
  DefenseUpgrade: { type: 'Defense' };
  UtilityUpgrade: { type: 'Utility' };
  UltimateWeapons: undefined;
  Cards: undefined;
  Labs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Tower Tracker' }} />
            <Stack.Screen name="AttackUpgrade" component={UpgradeScreen} options={{ title: 'Attack Upgrade' }} />
            <Stack.Screen name="DefenseUpgrade" component={UpgradeScreen} options={{ title: 'Defense Upgrade' }} />
            <Stack.Screen name="UtilityUpgrade" component={UpgradeScreen} options={{ title: 'Utility Upgrade' }} />
            <Stack.Screen name="UltimateWeapons" component={UltimateWeaponsScreen} options={{ title: 'Ultimate Weapons' }} />
            <Stack.Screen name="Cards" component={CardsScreen} options={{ title: 'Cards' }} />
            <Stack.Screen name="Labs" component={LabsScreen} options={{ title: 'Labs' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </Provider>
  );
}
