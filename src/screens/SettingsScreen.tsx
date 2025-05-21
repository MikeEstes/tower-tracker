import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import Constants from 'expo-constants';

import { Colors } from '../types/colors';
import { Spacing } from '../styles/spacing';
import withBaseScreen from '../components/withBaseScreen';

const SettingsScreen = () => {
  const version = Constants.expoConfig?.version || '1.0.0';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.disclaimer}>
          This is a fan-made utility for The Tower game. This application is not affiliated with, authorized, maintained, sponsored, or endorsed by The Tower or Tech Tree Games or any of its affiliates or subsidiaries.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Version</Text>
        <Text style={styles.versionText}>v{version}</Text>
      </View>
    </ScrollView>
  );
};

export default withBaseScreen(SettingsScreen, {
  getTitle: () => 'Settings',
  getBannerColor: () => Colors.moduleBackground,
  moduleType: 'hidden',
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: Spacing.md,
  },
  disclaimer: {
    color: Colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  versionText: {
    color: Colors.text,
    fontSize: 16,
  },
}); 