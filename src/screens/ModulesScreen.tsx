import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// Placeholder screen for the Modules module
export default function ModulesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Modules Module Placeholder</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
}); 