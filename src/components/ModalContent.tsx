import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../types/colors';
import { Spacing } from '../styles/spacing';
import { Typography } from '../styles/fonts';

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
        <Text style={Typography.modalHeader}>{title}</Text>
      </View>
      <View style={styles.modalBody}>
        {description && <Text style={Typography.body}>{description}</Text>}
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
}); 