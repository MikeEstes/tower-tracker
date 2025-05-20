import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAtom } from 'jotai';

import { Colors } from '../types/colors';
import withBaseScreen from '../components/withBaseScreen';
import { previewModeAtom } from '../atoms/playerProgressAtom';

const DevScreen = () => {
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Developer Menu</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => setPreviewMode(!previewMode)}>
          <Text style={styles.buttonText}>{`Toggle Preview Mode: ${previewMode}`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};

export default withBaseScreen(DevScreen, {
  getTitle: () => 'Dev Menu',
  getBannerColor: () => Colors.devBanner,
  showAmountSelector: false,
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