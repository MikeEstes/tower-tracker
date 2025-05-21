import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import CardModule from '../components/CardModule';
import { CardData } from '../data/CardData';
import { Colors } from '../styles/colors';
import CardModal from '../components/CardModal';
import withBaseScreen from '../components/withBaseScreen';
import { playerCardTotalAmountAtom, previewCardTotalAmountAtom, previewModeAtom } from '../atoms/playerProgressAtom';
import { Spacing } from '../styles/spacing';
import { infoModalDataAtom } from '../atoms/modalsAtom';
import { selectedCardAtom } from '../atoms/utilitiesAtom';

const CardsScreen = () => {
  const previewMode = useAtomValue(previewModeAtom);
  const totalAmount = useAtomValue(previewMode ? previewCardTotalAmountAtom : playerCardTotalAmountAtom);
  const setSelectedCard = useSetAtom(selectedCardAtom);
  const setInfoModalData = useSetAtom(infoModalDataAtom);
  const maxAmount = CardData.length * 81;

  useEffect(() => {
    setSelectedCard(null);

    return () => {
      setInfoModalData(null);
    };
  }, []);

  useEffect(() => {
    setInfoModalData({
      title: 'Cards Stats',
      stats: [
        { label: 'Cards Collected', value: `${totalAmount.toLocaleString()} / ${maxAmount.toLocaleString()}` },
        { label: 'Gems Remaining', value: ((maxAmount - totalAmount) * 20).toLocaleString() },
        { label: 'Total Progress', value: `${(totalAmount / maxAmount * 100).toFixed(2)}%` },
      ],
    });
  }, [totalAmount, maxAmount]);


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