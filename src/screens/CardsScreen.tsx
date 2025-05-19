import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import CardModule from '../components/CardModule';
import { CardData } from '../data/CardData';
import { Colors } from '../types/colors';
import CardModal from '../components/CardModal';
import withBaseScreen from '../components/withBaseScreen';

const CardsScreen = () => {
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
  showAmountSelector: false,
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