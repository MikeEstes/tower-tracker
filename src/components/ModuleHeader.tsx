import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import UpgradeAmountSelector from './UpgradeAmountSelector';
import { Colors } from '../types/colors';

type ModuleHeaderProps = {
  title: string;
  bannerColor: string;
  showAmountSelector?: boolean;
}

const ModuleHeader = ({ title, bannerColor, showAmountSelector = false }: ModuleHeaderProps) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleInfoPress = () => {
    console.log('Info pressed');
  };

  return (
    <View style={[styles.container, { backgroundColor: bannerColor }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title.toUpperCase()}</Text>
        <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
          <Ionicons name='information-circle' size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
      {showAmountSelector && <UpgradeAmountSelector />}
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
    padding: 4,
  },
  container: {
    gap: 8,
    justifyContent: 'center',
    padding: 16,
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
    padding: 4,
  },
});