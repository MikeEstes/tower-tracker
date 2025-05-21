import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { useAtom } from 'jotai';
import Toast from 'react-native-toast-message';

import { Colors } from '../styles/colors';
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

      {/* Toast test buttons */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => Toast.show({ type: 'success', text1: 'Success!', text2: 'This is a success toast.' })}
      >
        <Text style={styles.buttonText}>Show Success Toast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => Toast.show({ type: 'error', text1: 'Error!', text2: 'This is an error toast.' })}
      >
        <Text style={styles.buttonText}>Show Error Toast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => Toast.show({ type: 'info', text1: 'Info', text2: 'This is an info toast.' })}
      >
        <Text style={styles.buttonText}>Show Info Toast</Text>
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