import React from 'react';
import { StyleSheet, Modal, Pressable } from 'react-native';

import { Atom, useAtom } from 'jotai';

import { Colors } from '../types/colors';

type BaseModalProps = {
  children: React.ReactNode;
  modalAtom: Atom<boolean>;
  onClose: () => void;
};

const BaseModal = ({ children, modalAtom, onClose }: BaseModalProps) => {
  const [isVisible, setIsVisible] = useAtom(modalAtom);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true} style={styles.container}>
      <Pressable style={styles.modalBackground} onPress={handleClose}>
        {children}
      </Pressable>
    </Modal>
  );
};

export default BaseModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: Colors.modalBackground,
    flex: 1,
    justifyContent: 'center',
  },
});