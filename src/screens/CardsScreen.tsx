import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useAtomValue } from 'jotai';

import CardModule from '../components/CardModule';
import { CardData } from '../data/CardData';
import { Colors } from '../types/colors';
import CardModal from '../components/CardModal';
import withBaseScreen from '../components/withBaseScreen';
import { playerCardTotalAmountAtom, previewCardTotalAmountAtom, previewModeAtom } from '../atoms/playerProgressAtom';

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
        renderItem={({ item }) => <CardModule {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
      <CardModal />
    </View>
  );
};

export default withBaseScreen(CardsScreen, {
  getTitle: () => 'Cards',
  getBannerColor: () => Colors.cardsBanner,
  showAmountSelector: true,
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  list: {
    gap: 6,
  },
  row: {
    flex: 1,
    gap: 6,
    justifyContent: 'flex-start',
  },
}); 