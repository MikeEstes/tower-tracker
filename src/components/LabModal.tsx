import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import { Lab } from '../types/labs';
import { labModalAtom, labModalDataAtom } from '../atoms/modalsAtom';
import { Colors } from '../types/colors';
import BaseModal from './BaseModal';
import { useLabData } from '../hooks/useLabData';
import { Spacing } from '../styles/spacing';

const LabModal = () => {
  const labId = useAtomValue(labModalDataAtom) as Lab['id'];
  const setLabModalData = useSetAtom(labModalDataAtom);
  const { name, description } = useLabData(labId);

  const handleClose = () => {
    setLabModalData(null);
  };

  if (!labId) return null;

  return (
    <BaseModal modalAtom={labModalAtom} onClose={handleClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.modalBody}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.modalFooter}>
          {/** */}
        </View>
      </View>
    </BaseModal>
  );
};

export default LabModal;

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