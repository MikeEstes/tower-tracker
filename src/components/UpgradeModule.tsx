import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useSetAtom } from 'jotai';

import { Upgrade } from '../types/upgrades';
import { Colors } from '../types/colors';
import { useUpgradeData } from '../hooks/useUpgradeData';
import { upgradeModalAtom, upgradeModalDataAtom } from '../atoms/modalsAtom';
import { selectedUpgradeAtom } from '../atoms/utilitiesAtom';
import { usePreviewMode } from '../hooks/usePreviewMode';
import { Spacing } from '../styles/spacing';
import { Typography } from '../styles/fonts';

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
      <Pressable style={styles.header} onPress={handleContainerPress} onLongPress={handleContainerLongPress}>
        <Text style={[Typography.moduleHeader, isSelected && Typography.textSelected]}>{name}</Text>
      </Pressable>
      <View style={[styles.controlsContainer, isMaxed && styles.containerMaxed]}>
        <View style={styles.displayContainer}>
          <Text style={Typography.display}>{progress}</Text>
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
    padding: Spacing.sm,
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
  header: {
    flex: 3,
    justifyContent: 'center',
  },
});