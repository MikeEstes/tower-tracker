import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useSetAtom } from 'jotai';

import { Colors } from '../types/colors';
import { Card, Rarity } from '../types/cards';
import { cardModalAtom, cardModalDataAtom } from '../atoms/modalsAtom';
import { useCardData } from '../hooks/useCardData';
import { usePreviewMode } from '../hooks/usePreviewMode';
import { selectedCardAtom } from '../atoms/utilitiesAtom';
import { Spacing } from '../styles/spacing';
import { Typography } from '../styles/fonts';

const CardModule = (item: Card) => {
  const { id, name, rarity } = item;
  const { levelText, cardLevel, isSelected } = useCardData(id);
  const setSelectedCard = useSetAtom(selectedCardAtom);
  const isPreview = usePreviewMode();

  const setCardModalData = useSetAtom(cardModalDataAtom);
  const setIsVisible = useSetAtom(cardModalAtom);

  // derive stars display and color mapping
  const starsMap = ["LOCKED", "★", "★★", "★★★", "★★★★", "★★★★★"];
  const stars = starsMap[Math.min(cardLevel, starsMap.length - 1)];
  const starColorMap: Record<number, string> = { 6: Colors.gold, 7: Colors.epic };
  const starColor = starColorMap[cardLevel] ?? Colors.text;
  const borderColorMap: Record<Rarity, string> = { "Common": Colors.common, "Rare": Colors.rare, "Epic": Colors.epic };
  const borderColor = borderColorMap[rarity] ?? Colors.moduleBorder;

  const handleContainerPress = () => {
    if (isPreview) return;

    setSelectedCard(id);
  };

  const handleContainerLongPress = () => {
    setCardModalData(id);
    setIsVisible(true);
  };

  return (
    <Pressable style={[styles.container, { borderColor }, isSelected && styles.containerSelected]} onPress={handleContainerPress} onLongPress={handleContainerLongPress}>
      <View style={styles.header}>
        <Text style={[Typography.moduleHeader, isSelected && Typography.textSelected]}>{name}</Text>
      </View>
      <View style={[styles.body, { borderColor }, isSelected && { borderColor: Colors.moduleBorderSelected }]}>
        <View style={styles.bodyTextContainer}>
          <Text style={styles.bodyText}>{levelText}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: starColor }]}>{stars}</Text>
      </View>
    </Pressable >
  );
};

export default CardModule;

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bodyText: {
    ...Typography.display,
    textAlign: 'center',
  },
  bodyTextContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.moduleBackground,
    borderRadius: 8,
    borderWidth: 2,
    height: 120,
  },
  containerSelected: {
    backgroundColor: Colors.moduleBackgroundSelected,
    borderColor: Colors.moduleBorderSelected,
  },
  footer: {
    alignItems: 'center',
    height: '20%',
    justifyContent: 'center',
    width: '100%',
  },
  footerText: {
    ...Typography.display,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    //height: '20%',
    justifyContent: 'center',
    padding: Spacing.sm,
  },
});