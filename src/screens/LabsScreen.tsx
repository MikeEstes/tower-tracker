import React from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ModuleHeader from '../components/ModuleHeader';
import { Colors } from '../types/colors';

// Placeholder screen for the Labs module
export default function LabsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ModuleHeader bannerColor={Colors.labsBanner} title='Labs' />
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
}); 