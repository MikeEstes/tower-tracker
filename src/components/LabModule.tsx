import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import { useSetAtom } from 'jotai';

import { Colors } from '../types/colors';
import { useLabData } from '../hooks/useLabData';
import { usePreviewMode } from '../hooks/usePreviewMode';
import { labModalAtom, labModalDataAtom } from '../atoms/modalsAtom';
import { Lab } from '../types/labs';
import { selectedLabAtom } from '../atoms/utilitiesAtom';

const LabModule = (item: Lab) => {
  const { id, name } = item;
  const { progress, maxLevel, increment, decrement, isMaxed } = useLabData(id);
  const setSelectedLab = useSetAtom(selectedLabAtom);
  const isPreview = usePreviewMode();

  const setIsVisible = useSetAtom(labModalAtom);
  const setLabModalData = useSetAtom(labModalDataAtom);

  const handleContainerPress = () => {
    setSelectedLab(id);
  };

  const handleContainerLongPress = () => {
    setLabModalData(id);
    setIsVisible(true);
  };

  return (
    <Pressable style={[styles.container, isMaxed && styles.containerMaxed]} onPress={handleContainerPress} onLongPress={handleContainerLongPress}>
      <Text style={styles.text}>{`${name} lv. ${isMaxed ? "Max" : progress}`}</Text>
      <View style={styles.progressContainer}>
        {!isPreview && <TouchableOpacity
          style={[styles.button, progress === 0 && styles.buttonDisabled]}
          onPress={decrement}
          disabled={progress === 0}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>}
        <Text style={styles.progressText}>{progress}/{maxLevel}</Text>
        {!isPreview && <TouchableOpacity
          style={[styles.button, isMaxed && styles.buttonDisabled]}
          onPress={increment}
          disabled={isMaxed}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>}
      </View>
    </Pressable>
  );
}

export default LabModule;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.buttonBackground,
    borderRadius: 4,
    minWidth: 36,
    padding: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
  },
  container: {
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderWidth: 2,
    flex: 1,
    margin: 4,
    padding: 12,
  },
  containerMaxed: {
    backgroundColor: Colors.moduleBackgroundMaxed,
    borderColor: Colors.moduleBorderMaxed,
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: Colors.text,
    fontSize: 14,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
});
