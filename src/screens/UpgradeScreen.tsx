import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../../App';
import { AttackUpgradeData } from '../data/AttackUpgradeData';
import UpgradeModule from '../components/UpgradeModule';
import { Colors } from '../types/colors';
import { DefenseUpgradeData } from '../data/DefenseUpgradeData';
import { UtilityUpgradeData } from '../data/UtilityUpgradeData';
import UpgradeModal from '../components/UpgradeModal';
import UpgradeAmountSelector from '../components/UpgradeAmountSelector';

// Get type param from route
type UpgradeScreenRouteProp = RouteProp<RootStackParamList, 'AttackUpgrade' | 'DefenseUpgrade' | 'UtilityUpgrade'>;
const UpgradeScreen = () => {
  const route = useRoute<UpgradeScreenRouteProp>();
  const { type } = route.params;
  const dataMap = {
    Attack: AttackUpgradeData,
    Defense: DefenseUpgradeData,
    Utility: UtilityUpgradeData,
  }
  const bannerColorMap = {
    Attack: Colors.attackBanner,
    Defense: Colors.defenseBanner,
    Utility: Colors.utilityBanner,
  }
  const upgradeData = dataMap[type];
  const bannerColor = bannerColorMap[type];

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: bannerColor }]}>
          <Text style={styles.headerText}>{`${type.toUpperCase()} UPGRADES`}</Text>
          <UpgradeAmountSelector />
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
      </View>
      <UpgradeModal />
    </>
  );
};

export default UpgradeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  header: {
    gap: 8,
    justifyContent: 'center',
    padding: 16,
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