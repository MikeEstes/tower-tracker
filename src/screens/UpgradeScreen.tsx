import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../../App';
import { AttackUpgradeData } from '../data/AttackUpgradeData';
import { DefenseUpgradeData } from '../data/DefenseUpgradeData';
import { UtilityUpgradeData } from '../data/UtilityUpgradeData';
import UpgradeModule from '../components/UpgradeModule';
import UpgradeModal from '../components/UpgradeModal';
import { Colors } from '../types/colors';
import withBaseScreen from '../components/withBaseScreen';

// Map route param to banner colors and data sets
const bannerColorMap = {
  Attack: Colors.attackBanner,
  Defense: Colors.defenseBanner,
  Utility: Colors.utilityBanner,
};

const dataMap = {
  Attack: AttackUpgradeData,
  Defense: DefenseUpgradeData,
  Utility: UtilityUpgradeData,
};

type UpgradeScreenRouteProp = RouteProp<RootStackParamList, 'AttackUpgrade' | 'DefenseUpgrade' | 'UtilityUpgrade'>;
type UpgradeScreenProps = { route: UpgradeScreenRouteProp };

const UpgradeScreen = ({ route }: UpgradeScreenProps) => {
  const { type } = route.params;
  const upgradeData = dataMap[type];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={upgradeData}
        renderItem={({ item }) => <UpgradeModule {...item} />}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <UpgradeModal />
    </View>
  );
};

export default withBaseScreen<UpgradeScreenProps>(UpgradeScreen, {
  getTitle: ({ route }) => `${route.params.type} UPGRADES`,
  getBannerColor: ({ route }) => bannerColorMap[route.params.type],
  showAmountSelector: true,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: 16,
  },
  list: {
    gap: 6,
  },
  listContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    gap: 6,
    justifyContent: 'flex-start',
  },
}); 