import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../types/colors';
import { Spacing } from '../styles/spacing';

type ModalContentProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
};

const ModalContent = ({ title, description, children, footerContent }: ModalContentProps) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.modalBody}>
        {description && <Text style={styles.description}>{description}</Text>}
        {children}
      </View>
      {footerContent && (
        <View style={styles.modalFooter}>
          {footerContent}
        </View>
      )}
    </View>
  );
};

export default ModalContent;

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