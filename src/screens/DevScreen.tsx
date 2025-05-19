import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../types/colors';
import withBaseScreen from '../components/withBaseScreen';

const DevScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Developer Menu</Text>
        {/* Add future dev tools here */}
      </View>
    </SafeAreaView>
  );
};

export default withBaseScreen(DevScreen, {
  getTitle: () => 'Dev Menu',
  getBannerColor: () => Colors.devBanner,
  showAmountSelector: false,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
}); 