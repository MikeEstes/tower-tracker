import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

// Define navigation prop type for this screen
type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

// Describe the modules to be displayed on the landing page
type Module = {
  key: keyof RootStackParamList;
  title: string;
  params?: { type: 'Attack' | 'Defense' | 'Utility' };
};

const modules: Module[] = [
  { key: 'AttackUpgrade', title: 'Attack Upgrades', params: { type: 'Attack' } },
  { key: 'DefenseUpgrade', title: 'Defense Upgrades', params: { type: 'Defense' } },
  { key: 'UtilityUpgrade', title: 'Utility Upgrades', params: { type: 'Utility' } },
  { key: 'UltimateWeapons', title: 'Ultimate Weapons' },
  { key: 'Cards', title: 'Cards' },
  { key: 'Labs', title: 'Labs' },
];

export default function LandingScreen() {
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const numColumns = 2;
  const { width } = useWindowDimensions();
  // Calculate card size based on screen width and spacing
  const cardSize = (width - 32 - (numColumns - 1) * 16) / numColumns;

  return (
    <SafeAreaView style={styles.container}>
      {/* Render a grid of module cards */}
      <FlatList
        data={modules}
        keyExtractor={(item) => item.key}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { width: cardSize, height: cardSize }]}
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
              }
            }}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    margin: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    alignItems: 'center',
  },
}); 