import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { useAtom } from 'jotai';
import { Ionicons } from '@expo/vector-icons';

import { previewModeAtom } from '../atoms/playerProgressAtom';
import { Colors } from '../types/colors';

const PreviewButton = () => {
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);

  if (!previewMode) return null;

  const handlePress = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Ionicons name="eye-off" size={22} color="white" />
    </TouchableOpacity>
  );
};

export default PreviewButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.moduleBackground,
    borderRadius: 100,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 50,
    width: 40,
  },
});