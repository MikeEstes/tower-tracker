import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, TouchableOpacity } from 'react-native';

import { useSetAtom } from 'jotai';

import { Colors } from '../types/colors';
import { Card, Rarity } from '../types/cards';
import { cardModalAtom, cardModalDataAtom } from '../atoms/modalsAtom';
import { useCardData } from '../hooks/useCardData';
import { usePreviewMode } from '../hooks/usePreviewMode';

const { width } = Dimensions.get('window');

const CardModule = (item: Card) => {
  const { id, name, rarity } = item;
  const { increment, decrement, levelText, cardLevel } = useCardData(id);
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
    setCardModalData(id);
    setIsVisible(true);
  };

  return (
    <Pressable style={[styles.container, { borderColor }]} onPress={handleContainerPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={[styles.body, { borderColor }]}>
        {!isPreview && <TouchableOpacity onPress={decrement} style={[styles.button, styles.negButton]}>
          <Text style={styles.buttonText}>{'-'}</Text>
        </TouchableOpacity>}
        <View style={styles.bodyTextContainer}>
          <Text style={styles.bodyText}>{levelText}</Text>
        </View>
        {!isPreview && <TouchableOpacity onPress={increment} style={[styles.button, styles.posButton]}>
          <Text style={styles.buttonText}>{'+'}</Text>
        </TouchableOpacity>}
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
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyTextContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    padding: 4,
    width: '20%',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: Colors.moduleBackground,
    borderRadius: 8,
    borderWidth: 2,
    height: 200,
    width: width * .4,
  },
  footer: {
    alignItems: 'center',
    height: '20%',
    justifyContent: 'center',
    width: '100%',
  },
  footerText: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    height: '20%',
    justifyContent: 'center',
    padding: 4,
  },
  negButton: {
    backgroundColor: 'red',
  },
  posButton: {
    backgroundColor: 'green',
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});