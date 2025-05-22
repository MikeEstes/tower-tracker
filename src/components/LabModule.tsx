import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useSetAtom, useAtomValue } from 'jotai';

import { Colors } from '../styles/colors';
import { useLabData } from '../hooks/useLabData';
import { previewModeAtom } from '../atoms/playerProgressAtom';
import { labModalAtom, labModalDataAtom } from '../atoms/modalsAtom';
import { Lab } from '../types/labs';
import { selectedLabAtom } from '../atoms/utilitiesAtom';
import { Spacing } from '../styles/spacing';
import { Typography } from '../styles/fonts';

const LabModule = (item: Lab) => {
  const { id, name } = item;
  const { progress, maxLevel, isMaxed, isSelected } = useLabData(id);
  const setSelectedLab = useSetAtom(selectedLabAtom);
  const previewMode = useAtomValue(previewModeAtom);
  const setIsVisible = useSetAtom(labModalAtom);
  const setLabModalData = useSetAtom(labModalDataAtom);

  const handleContainerPress = () => {
    if (previewMode) return;

    setSelectedLab(id);
  };

  const handleContainerLongPress = () => {
    if (__DEV__) {
      setLabModalData(id);
      setIsVisible(true);
    }
  };

  return (
    <Pressable style={[styles.container, isMaxed && styles.containerMaxed, isSelected && styles.containerSelected]} onPress={handleContainerPress} onLongPress={handleContainerLongPress}>
      <View style={styles.header}>
        <Text style={[Typography.moduleHeader, isSelected && Typography.textSelected]}>{`${name} lv. ${isMaxed ? "Max" : progress}`}</Text>
      </View>
      <View style={styles.body}>
        <Text style={Typography.display}>{progress}/{maxLevel}</Text>
      </View>
    </Pressable>
  );
}

export default LabModule;

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Spacing.md,
  },
  container: {
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderWidth: 2,
    flex: 1,
    margin: Spacing.sm,
    padding: Spacing.md,
  },
  containerMaxed: {
    backgroundColor: Colors.moduleBackgroundMaxed,
    borderColor: Colors.moduleBorderMaxed,
  },
  containerSelected: {
    backgroundColor: Colors.moduleBackgroundSelected,
    borderColor: Colors.moduleBorderSelected,
  },
  header: {
    flex: 1,
  },
});
