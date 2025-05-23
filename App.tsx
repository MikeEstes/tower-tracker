import React from 'react';
import 'react-native-get-random-values';

import { Provider } from 'jotai';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';

import LandingScreen from './src/screens/LandingScreen';
import UpgradeScreen from './src/screens/UpgradeScreen';
import UltimateWeaponsScreen from './src/screens/UltimateWeaponsScreen';
import CardsScreen from './src/screens/CardsScreen';
import LabsScreen from './src/screens/LabsScreen';
import ShareScreen from './src/screens/ShareScreen';
import RelicsScreen from './src/screens/RelicsScreen';
import ModulesScreen from './src/screens/ModulesScreen';
import DevScreen from './src/screens/DevScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StorageSync from './src/components/StorageSync';
import InfoModal from './src/components/InfoModal';
import ToastConfig from './src/configs/toastConfig';

// Define the navigation param list for type safety
export type RootStackParamList = {
  Landing: undefined;
  AttackUpgrade: { type: 'Attack' };
  DefenseUpgrade: { type: 'Defense' };
  UtilityUpgrade: { type: 'Utility' };
  UltimateWeapons: undefined;
  Cards: undefined;
  Labs: undefined;
  Share: { code?: string };
  Relics: undefined;
  Modules: undefined;
  Dev: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Configure deep linking for the app
const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix, 'towertracker://'],
  config: {
    screens: {
      Landing: '',
      AttackUpgrade: 'attack/:type',
      DefenseUpgrade: 'defense/:type',
      UtilityUpgrade: 'utility/:type',
      UltimateWeapons: 'ultimate',
      Cards: 'cards',
      Labs: 'labs',
      Share: 'share/:code',
      Relics: 'relics',
      Modules: 'modules',
      Dev: 'dev',
      Settings: 'settings',
    },
  },
};

const App = () => {
  return (
    <Provider>
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Tower Tracker' }} />
            <Stack.Screen name="AttackUpgrade" component={UpgradeScreen} options={{ title: 'Attack Upgrade' }} />
            <Stack.Screen name="DefenseUpgrade" component={UpgradeScreen} options={{ title: 'Defense Upgrade' }} />
            <Stack.Screen name="UtilityUpgrade" component={UpgradeScreen} options={{ title: 'Utility Upgrade' }} />
            <Stack.Screen name="UltimateWeapons" component={UltimateWeaponsScreen} options={{ title: 'Ultimate Weapons' }} />
            <Stack.Screen name="Cards" component={CardsScreen} options={{ title: 'Cards' }} />
            <Stack.Screen name="Labs" component={LabsScreen} options={{ title: 'Labs' }} />
            <Stack.Screen name="Share" component={ShareScreen} options={{ title: 'Share Progress' }} />
            <Stack.Screen name="Relics" component={RelicsScreen} options={{ title: 'Relics' }} />
            <Stack.Screen name="Modules" component={ModulesScreen} options={{ title: 'Modules' }} />
            <Stack.Screen name="Dev" component={DevScreen} options={{ title: 'Dev Menu' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          </Stack.Navigator>
          <StorageSync />
          <InfoModal />
        </NavigationContainer>
        <StatusBar hidden={true} />
        <Toast config={ToastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
