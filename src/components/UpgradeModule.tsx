import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useSetAtom } from 'jotai';

import { Upgrade } from '../types/upgrades';
import { Colors } from '../types/colors';
import { useUpgradeData } from '../hooks/useUpgradeData';
import { upgradeModalAtom, upgradeModalDataAtom } from '../atoms/modalsAtom';
import { selectedUpgradeAtom } from '../atoms/utilitiesAtom';
import { usePreviewMode } from '../hooks/usePreviewMode';

const UpgradeModule = (item: Upgrade) => {
  const { id, name } = item;
  const { progress, isMaxed, isSelected } = useUpgradeData(id);
  const setSelectedUpgrade = useSetAtom(selectedUpgradeAtom);
  const isPreview = usePreviewMode();

  const setIsVisible = useSetAtom(upgradeModalAtom);
  const setUpgradeModalData = useSetAtom(upgradeModalDataAtom);

  const handleContainerPress = () => {
    if (isPreview) return;

    setSelectedUpgrade(id);
  };

  const handleContainerLongPress = () => {
    setUpgradeModalData(id);
    setIsVisible(true);
  };

  return (
    <View style={[styles.container, isSelected && styles.containerSelected]}>
      <Pressable style={styles.nameContainer} onPress={handleContainerPress} onLongPress={handleContainerLongPress}>
        <Text style={[styles.text, isSelected && styles.textSelected]}>{name}</Text>
      </Pressable>
      <View style={[styles.controlsContainer, isMaxed && styles.containerMaxed]}>
        <View style={styles.displayContainer}>
          <Text style={styles.text}>{progress}</Text>
        </View>
      </View>
    </View>
  );
};

export default UpgradeModule;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderWidth: 2,
    flexDirection: 'row',
    height: 80,
    padding: 4,
  },
  containerMaxed: {
    backgroundColor: Colors.moduleBackgroundMaxed,
    borderColor: Colors.moduleBorderMaxed,
  },
  containerSelected: {
    backgroundColor: Colors.moduleBackgroundSelected,
    borderColor: Colors.moduleBorderSelected,
  },
  controlsContainer: {
    borderColor: Colors.moduleSubBorder,
    borderWidth: 2,
    flex: 2,
  },
  displayContainer: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSelected: {
    color: Colors.textSelected,
  },
});