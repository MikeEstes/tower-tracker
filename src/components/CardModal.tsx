import React from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { Card } from '../types/cards';
import { cardModalAtom, cardModalDataAtom } from '../atoms/modalsAtom';
import BaseModal from './BaseModal';
import { useCardData } from '../hooks/useCardData';
import ModalContent from './ModalContent';

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
      <ModalContent
        title={name}
        description={description}
      />
    </BaseModal>
  );
};

export default CardModal;