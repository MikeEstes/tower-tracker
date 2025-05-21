import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSetAtom } from 'jotai';

import { Colors } from '../styles/colors';
import { Spacing } from '../styles/spacing';
import { infoModalAtom } from '../atoms/modalsAtom';

type ModuleHeaderProps = {
  title: string;
  bannerColor: string;
  showInfoButton?: boolean;
}

const ModuleHeader = ({ title, bannerColor, showInfoButton = false }: ModuleHeaderProps) => {
  const navigation = useNavigation();
  const setInfoModalAtom = useSetAtom(infoModalAtom);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleInfoPress = () => {
    setInfoModalAtom(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: bannerColor }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title.toUpperCase()}</Text>
        {showInfoButton ? (
          <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
            <Ionicons name='information-circle' size={24} color={Colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.infoPlaceholder} />
        )}
      </View>
    </View>
  );
};

export default ModuleHeader;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderRadius: 10,
    borderWidth: 2,
    padding: Spacing.sm,
  },
  container: {
    gap: 8,
    justifyContent: 'center',
    padding: Spacing.lg,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  headerText: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoButton: {
    backgroundColor: Colors.moduleBackground,
    borderColor: Colors.moduleBorder,
    borderRadius: 10,
    borderWidth: 2,
    padding: Spacing.sm,
  },
  infoPlaceholder: {
    height: 24,
    width: 24,
  },
});