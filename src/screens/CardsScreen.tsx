import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useAtomValue } from 'jotai';

import CardModule from '../components/CardModule';
import { CardData } from '../data/CardData';
import { Colors } from '../types/colors';
import CardModal from '../components/CardModal';
import withBaseScreen from '../components/withBaseScreen';
import { playerCardTotalAmountAtom, previewCardTotalAmountAtom, previewModeAtom } from '../atoms/playerProgressAtom';
import { Spacing } from '../styles/spacing';

const CardsScreen = () => {
  const previewMode = useAtomValue(previewModeAtom);
  const totalAmount = useAtomValue(previewMode ? previewCardTotalAmountAtom : playerCardTotalAmountAtom);
  const maxAmount = CardData.length * 81;

  console.log(`Cards Collected: ${totalAmount} / ${maxAmount}`);
  console.log(`Gems Remaining: ${(maxAmount - totalAmount) * 20}`);
  console.log(`Total Progress: ${(totalAmount / maxAmount * 100).toFixed(2)}%`);

  return (
    <View style={styles.container}>
      <FlatList
        data={CardData}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <CardModule {...item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={styles.row}
      />
      <CardModal />
    </View>
  );
};

export default withBaseScreen(CardsScreen, {
  getTitle: () => 'Cards',
  getBannerColor: () => Colors.cardsBanner,
  moduleType: 'card',
  showInfoButton: true,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  listItem: {
    flex: .25,
  },
  row: {
    flex: 1,
    gap: Spacing.sm,
    justifyContent: 'flex-start',
    marginBottom: Spacing.sm,
  },
}); 