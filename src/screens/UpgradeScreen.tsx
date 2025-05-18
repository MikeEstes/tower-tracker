import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../App';
import { AttackUpgradeData } from '../data/AttackUpgradeData';
import UpgradeModule from '../components/UpgradeModule';
import { Colors } from '../types/colors';
import { DefenseUpgradeData } from '../data/DefenseUpgradeData';
import { UtilityUpgradeData } from '../data/UtilityUpgradeData';

// Get type param from route
type UpgradeScreenRouteProp = RouteProp<RootStackParamList, 'AttackUpgrade' | 'DefenseUpgrade' | 'UtilityUpgrade'>;
const UpgradeScreen = () => {
  const route = useRoute<UpgradeScreenRouteProp>();
  const { type } = route.params;
  const upgradeData = type === 'Attack' ? AttackUpgradeData : type === 'Defense' ? DefenseUpgradeData : UtilityUpgradeData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{`${type} Upgrades`}</Text>
      </View>
      <FlatList
        data={upgradeData}
        renderItem={({ item }) => (
          <UpgradeModule {...item} />
        )}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default UpgradeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: Colors.moduleBackground,
    height: 100,
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    gap: 6,
  },
  row: {
    flex: 1,
    gap: 6,
    justifyContent: 'flex-start',
  }
}); 