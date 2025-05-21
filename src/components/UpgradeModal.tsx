import React from 'react';
import { Text } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';

import { upgradeModalAtom, upgradeModalDataAtom } from '../atoms/modalsAtom';
import { Colors } from '../types/colors';
import { useUpgradeData } from '../hooks/useUpgradeData';
import BaseModal from './BaseModal';
import ModalContent from './ModalContent';
import { Typography } from '../styles/fonts';

const UpgradeModal = () => {
  const upgradeId = useAtomValue(upgradeModalDataAtom);
  const setUpgradeModalData = useSetAtom(upgradeModalDataAtom);
  const { name, description, maxLevel, progress } = useUpgradeData(upgradeId ?? '');

  const handleClose = () => {
    setUpgradeModalData(null);
  };

  if (!upgradeId) return null;

  const footerContent = (
    <>
      <Text style={Typography.display}>
        Current Progress: {progress}
      </Text>
      <Text style={{ color: Colors.text, fontSize: 16, textAlign: 'center' }}>
        Max Level: {maxLevel}
      </Text>
    </>
  );

  return (
    <BaseModal modalAtom={upgradeModalAtom} onClose={handleClose}>
      <ModalContent
        title={name}
        description={description}
        footerContent={footerContent}
      />
    </BaseModal>
  );
};

export default UpgradeModal;