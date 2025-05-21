import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import { infoModalAtom, infoModalDataAtom } from '../atoms/modalsAtom';
import { Colors } from '../types/colors';
import BaseModal from './BaseModal';
import ModalContent from './ModalContent';
import { Spacing } from '../styles/spacing';
import { Typography } from '../styles/fonts';

type StatItem = {
  label: string;
  value: string | number;
};

type InfoModalData = {
  title: string;
  stats: StatItem[];
};

const InfoModal = () => {
  const modalData = useAtomValue(infoModalDataAtom) as InfoModalData | null;
  const setInfoModalData = useSetAtom(infoModalDataAtom);

  const handleClose = () => {
    setInfoModalData(null);
  };

  if (!modalData) return null;

  const renderStats = () => (
    <View style={styles.statsContainer}>
      {modalData.stats.map((stat, index) => (
        <View key={index} style={styles.statRow}>
          <Text style={Typography.body}>{stat.label}:</Text>
          <Text style={Typography.body}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <BaseModal modalAtom={infoModalAtom} onClose={handleClose}>
      <ModalContent title={modalData.title}>
        {renderStats()}
      </ModalContent>
    </BaseModal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  statRow: {
    borderBottomColor: Colors.moduleBorder,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  statsContainer: {
    padding: 10,
    width: '100%',
  },
}); 