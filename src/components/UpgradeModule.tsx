import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, TouchableOpacity } from 'react-native';

import { useSetAtom } from 'jotai';

import { Upgrade } from '../types/upgrades';
import { Colors } from '../types/colors';
import { useUpgradeData } from '../hooks/useUpgradeData';
import { upgradeModalAtom, upgradeModalDataAtom } from '../atoms/modalsAtom';
import { usePreviewMode } from '../hooks/usePreviewMode';

const { width } = Dimensions.get('window');
const UpgradeModule = (item: Upgrade) => {
  const { id, name } = item;
  const { progress, increment, decrement, isMaxed } = useUpgradeData(id);
  const disableSub = progress === 0;
  const disableAdd = isMaxed;
  const setIsVisible = useSetAtom(upgradeModalAtom);
  const setUpgradeModalData = useSetAtom(upgradeModalDataAtom);
  const isPreview = usePreviewMode();

  const handleContainerPress = () => {
    setUpgradeModalData(id);
    setIsVisible(true);
  };

  const handleNegButtonPress = () => {
    decrement();
  };

  const handlePosButtonPress = () => {
    increment();
  };


  return (
    <View style={[styles.container, isMaxed && styles.containerMaxed]}>
      <Pressable style={styles.nameContainer} onPress={handleContainerPress}>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
      <View style={styles.controlsContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.text}>{progress}</Text>
        </View>
        {!isPreview && <View style={styles.controls}>
          <TouchableOpacity style={[styles.controlButton, styles.negButton, disableSub && styles.disabled]} onPress={handleNegButtonPress}>
            <Text style={styles.controlButtonText}>{'-'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.posButton, disableAdd && styles.disabled]} onPress={handlePosButtonPress}>
            <Text style={styles.controlButtonText}>{'+'}</Text>
          </TouchableOpacity>
        </View>}
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
    width: width * 0.45,
  },
  containerMaxed: {
    backgroundColor: Colors.moduleBackgroundMaxed,
    borderColor: Colors.moduleBorderMaxed,
  },
  controlButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  controlButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
  },
  controlsContainer: {
    borderColor: Colors.moduleSubBorder,
    borderWidth: 2,
    flex: 2,
  },
  disabled: {
    opacity: 0.5,
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
  negButton: {
    backgroundColor: 'red',
  },
  posButton: {
    backgroundColor: 'green',
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  }
});