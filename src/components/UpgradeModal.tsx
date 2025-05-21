import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import { upgradeModalAtom, upgradeModalDataAtom } from '../atoms/modalsAtom';
import { Colors } from '../types/colors';
import { useUpgradeData } from '../hooks/useUpgradeData';
import BaseModal from './BaseModal';
import { Spacing } from '../styles/spacing';

const UpgradeModal = () => {
  const upgradeId = useAtomValue(upgradeModalDataAtom);
  const setUpgradeModalData = useSetAtom(upgradeModalDataAtom);
  const { name, description, maxLevel, progress } = useUpgradeData(upgradeId ?? '');

  const handleClose = () => {
    setUpgradeModalData(null);
  };

  if (!upgradeId) return null;

  return (
    <BaseModal modalAtom={upgradeModalAtom} onClose={handleClose}>
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
    </BaseModal>
  );
};

export default UpgradeModal;

const styles = StyleSheet.create({
  description: {
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
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
    padding: Spacing.lg,
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