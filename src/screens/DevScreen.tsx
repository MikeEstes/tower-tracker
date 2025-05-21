import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { useAtom } from 'jotai';

import { Colors } from '../types/colors';
import withBaseScreen from '../components/withBaseScreen';
import { previewModeAtom } from '../atoms/playerProgressAtom';
import { Spacing } from '../styles/spacing';

const DevScreen = () => {
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Developer Menu</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => setPreviewMode(!previewMode)}>
        <Text style={styles.buttonText}>{`Toggle Preview Mode: ${previewMode}`}</Text>
      </TouchableOpacity>
    </View >
  );
};

export default withBaseScreen(DevScreen, {
  getTitle: () => 'Dev Menu',
  getBannerColor: () => Colors.devBanner,
  moduleType: 'hidden'
});

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderWidth: 2,
    height: 60,
    justifyContent: 'center',
    margin: 4,
    padding: 12,
    width: 240
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: Spacing.md,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
}); 