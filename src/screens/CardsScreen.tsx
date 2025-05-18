import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import CardModule from '../components/CardModule';
import { CardData } from '../data/CardData';
import { Colors } from '../types/colors';
import CardModal from '../components/CardModal';

// Placeholder screen for the Cards module
export default function CardsScreen() {
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={CardData}
          renderItem={({ item }) => <CardModule {...item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      </View>
      <CardModal />
    </>
  );
}

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
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
}); 