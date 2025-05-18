import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, TouchableOpacity } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import { Upgrade } from '../types/upgrades';
import { Colors } from '../types/colors';
import { usePlayerData } from '../hooks/usePlayerData';
import { playerUpgradeProgressAtom } from '../atoms/playerProgressAtom';
import { upgradeModalAtom, upgradeModalDataAtom } from '../atoms/modalsAtom';

const { width } = Dimensions.get('window');
const UpgradeModule = (item: Upgrade) => {
  const { id, name } = item;
  const playerProgress = useAtomValue(playerUpgradeProgressAtom);
  const setIsVisible = useSetAtom(upgradeModalAtom);
  const setUpgradeModalData = useSetAtom(upgradeModalDataAtom);
  const { incrementStat, decrementStat } = usePlayerData();

  const handleContainerPress = () => {
    setUpgradeModalData(id);
    setIsVisible(true);
  };

  const handleNegButtonPress = () => {
    decrementStat(item.id);
  };

  const handlePosButtonPress = () => {
    incrementStat(item.id);
  };


  return (
    <View style={styles.container}>
      <Pressable style={styles.nameContainer} onPress={handleContainerPress}>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
      <View style={styles.controlsContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.text}>{playerProgress[item.id as keyof typeof playerProgress]}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={[styles.controlButton, styles.negButton]} onPress={handleNegButtonPress}>
            <Text style={styles.controlButtonText}>{'-'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.posButton]} onPress={handlePosButtonPress}>
            <Text style={styles.controlButtonText}>{'+'}</Text>
          </TouchableOpacity>
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
    width: width * 0.45,
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
    borderWidth: 1,
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