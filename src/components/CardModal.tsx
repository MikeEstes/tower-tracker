import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import { Card } from '../types/cards';
import { cardModalAtom, cardModalDataAtom } from '../atoms/modalsAtom';
import { Colors } from '../types/colors';
import BaseModal from './BaseModal';
import { useCardData } from '../hooks/useCardData';
import { Spacing } from '../styles/spacing';

const CardModal = () => {
  const cardId = useAtomValue(cardModalDataAtom) as Card['id'];
  const setCardModalData = useSetAtom(cardModalDataAtom);
  const { name, description } = useCardData(cardId);

  const handleClose = () => {
    setCardModalData(null);
  };

  if (!cardId) return null;

  return (
    <BaseModal modalAtom={cardModalAtom} onClose={handleClose}>
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

export default CardModal;

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