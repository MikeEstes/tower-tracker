import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { upgradeModalAtom, upgradeModalDataAtom } from '../atoms/modalsAtom';
import { Colors } from '../types/colors';
import { useUpgradeData } from '../hooks/useUpgradeData';

const UpgradeModal = () => {
  const [isVisible, setIsVisible] = useAtom(upgradeModalAtom);
  const upgradeId = useAtomValue(upgradeModalDataAtom);
  const setUpgradeModalData = useSetAtom(upgradeModalDataAtom);
  const { name, description, maxLevel, progress } = useUpgradeData(upgradeId ?? '');

  const handleClose = () => {
    setIsVisible(false);
    setUpgradeModalData(null);
  };

  if (!upgradeId) return null;

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true} style={styles.container}>
      <Pressable style={styles.modalBackground} onPress={handleClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.modalFooter}>
            <Text style={styles.description}>Current Progress: {progress}</Text>
            <Text style={styles.description}>Max Level: {maxLevel}</Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default UpgradeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: Colors.modalBackground,
    flex: 1,
    justifyContent: 'center',
  },
  modalBody: {
    alignItems: 'center',
    height: '60%',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderRadius: 12,
    borderWidth: 2,
    maxHeight: '80%',
    maxWidth: '80%',
    padding: 16,
  },
  modalFooter: {
    height: '10%',
  },
  modalHeader: {
    alignItems: 'center',
    height: '10%',
    justifyContent: 'center',
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});