import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { useAtomValue, useSetAtom } from 'jotai';

import type { RootStackParamList } from '../../App';
import { AttackUpgradeData } from '../data/AttackUpgradeData';
import { DefenseUpgradeData } from '../data/DefenseUpgradeData';
import { UtilityUpgradeData } from '../data/UtilityUpgradeData';
import UpgradeModule from '../components/UpgradeModule';
import UpgradeModal from '../components/UpgradeModal';
import { Colors } from '../styles/colors';
import withBaseScreen from '../components/withBaseScreen';
import { selectedUpgradeAtom } from '../atoms/utilitiesAtom';
import { infoModalDataAtom } from '../atoms/modalsAtom';
import { MAX_UPGRADE_AMOUNT } from '../data';
import { playerUpgradeTotalAmountAtom, previewUpgradeTotalAmountAtom, previewModeAtom } from '../atoms/playerProgressAtom';

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
  const previewMode = useAtomValue(previewModeAtom);
  const totalAmount = useAtomValue(previewMode ? previewUpgradeTotalAmountAtom : playerUpgradeTotalAmountAtom);
  const upgradeData = dataMap[type];
  const setSelectedUpgrade = useSetAtom(selectedUpgradeAtom);
  const setInfoModalData = useSetAtom(infoModalDataAtom);

  useEffect(() => {
    setSelectedUpgrade(null);

    return () => {
      setInfoModalData(null);
    };
  }, []);

  useEffect(() => {
    setInfoModalData({
      title: 'Upgrade Stats',
      stats: [
        { label: 'Upgrades Collected', value: `${totalAmount.toLocaleString()} / ${MAX_UPGRADE_AMOUNT.toLocaleString()}` },
        { label: 'Total Progress', value: `${(totalAmount / MAX_UPGRADE_AMOUNT * 100).toFixed(2)}%` },
      ],
    });
  }, [totalAmount, MAX_UPGRADE_AMOUNT]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={upgradeData}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <UpgradeModule {...item} />
          </View>
        )}
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
  moduleType: 'upgrade',
  showInfoButton: true,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  list: {
    gap: 6,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flex: .5,
  },
  row: {
    flex: 1,
    gap: 6,
    justifyContent: 'flex-start',
  },
}); 