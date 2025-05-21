import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import type { RootStackParamList } from '../../App';
import { Colors } from '../types/colors';
import { Spacing } from '../styles/spacing';
import { Typography } from '../styles/fonts';

// Define navigation prop type for this screen
type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

// Describe the modules to be displayed on the landing page
type Module = {
  key: keyof RootStackParamList;
  title: string;
  disabled?: boolean;
  params?: { type: 'Attack' | 'Defense' | 'Utility' };
};

const modules: Module[] = [
  { key: 'AttackUpgrade', title: 'Attack Upgrades', params: { type: 'Attack' } },
  { key: 'DefenseUpgrade', title: 'Defense Upgrades', params: { type: 'Defense' } },
  { key: 'UtilityUpgrade', title: 'Utility Upgrades', params: { type: 'Utility' } },
  { key: 'UltimateWeapons', title: 'Ultimate Weapons', disabled: true },
  { key: 'Cards', title: 'Cards' },
  { key: 'Labs', title: 'Labs' },
  { key: 'Relics', title: 'Relics', disabled: true },
  { key: 'Modules', title: 'Modules', disabled: true },
  { key: 'Share', title: 'Share Progress' },
];

export default function LandingScreen() {
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const numColumns = 3;
  const { width } = useWindowDimensions();
  // Calculate card size based on screen width and spacing
  const cardSize = (width - 32 - (numColumns - 1) * 16) / numColumns;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>{'Tower Tracker'}</Text>
        <Pressable
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </Pressable>
      </View>
      {/* Render a grid of module cards */}
      <FlatList
        data={modules}
        keyExtractor={(item) => item.key}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { width: cardSize, height: cardSize }]}
            disabled={item.disabled}
            onPress={() => {
              switch (item.key) {
                case 'AttackUpgrade':
                  navigation.navigate('AttackUpgrade', { type: 'Attack' });
                  break;
                case 'DefenseUpgrade':
                  navigation.navigate('DefenseUpgrade', { type: 'Defense' });
                  break;
                case 'UtilityUpgrade':
                  navigation.navigate('UtilityUpgrade', { type: 'Utility' });
                  break;
                case 'UltimateWeapons':
                  navigation.navigate('UltimateWeapons');
                  break;
                case 'Cards':
                  navigation.navigate('Cards');
                  break;
                case 'Labs':
                  navigation.navigate('Labs');
                  break;
                case 'Relics':
                  navigation.navigate('Relics');
                  break;
                case 'Modules':
                  navigation.navigate('Modules');
                  break;
                case 'Share':
                  navigation.navigate('Share');
                  break;
              }
            }}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.disabled && <Text style={styles.cardSubtitle}>{'(Coming Soon)'}</Text>}
          </Pressable>
        )}
      />
      {__DEV__ && (
        <Pressable
          style={styles.devButton}
          onPress={() => navigation.navigate('Dev')}
        >
          <Text style={styles.devButtonText}>Dev</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    margin: 8,
  },
  cardSubtitle: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: Spacing.md,
  },
  devButton: {
    backgroundColor: Colors.devBanner,
    borderColor: Colors.moduleBorder,
    borderRadius: 8,
    borderWidth: 2,
    bottom: 25,
    padding: Spacing.md,
    position: 'absolute',
    right: 25,
  },
  devButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  listContainer: {
    alignItems: 'center',
  },
  logoText: {
    color: Colors.text,
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderRadius: 8,
    borderWidth: 2,
    padding: Spacing.sm,
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
}); 