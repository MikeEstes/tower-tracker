import React from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { Lab } from '../types/labs';
import { labModalAtom, labModalDataAtom } from '../atoms/modalsAtom';
import BaseModal from './BaseModal';
import { useLabData } from '../hooks/useLabData';
import ModalContent from './ModalContent';

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
      <ModalContent
        title={name}
        description={description}
      />
    </BaseModal>
  );
};

export default LabModal;