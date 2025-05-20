import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useAtom, useAtomValue } from 'jotai';

import { Colors } from '../types/colors';
import { upgradeAmountAtom, currentModuleTypeAtom } from '../atoms/configurationAtom';
import { useModuleActions } from '../hooks/useModuleActions';

const ModuleFooter = () => {
  const options = ['1', '5', '10', '100', 'MAX'] as const;
  const [upgradeAmount, setUpgradeAmount] = useAtom(upgradeAmountAtom);
  const moduleType = useAtomValue(currentModuleTypeAtom);
  const { increment, decrement } = useModuleActions();

  // If no module type is set, don't show the footer
  if (!moduleType) {
    return null;
  }

  const toggleUpgradeOption = () => {
    const currentIndex = options.indexOf(upgradeAmount);
    const nextIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
    setUpgradeAmount(options[nextIndex]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrement}>
        <Text style={styles.buttonText}>{'-'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleUpgradeOption}>
        <Text style={styles.buttonText}>{`${upgradeAmount === 'MAX' ? '' : 'x'} ${upgradeAmount}`}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={increment}>
        <Text style={styles.buttonText}>{'+'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModuleFooter;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.buttonBackground,
    borderColor: Colors.moduleBorder,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: Colors.footerColor,
    flexDirection: 'row',
    padding: 8,
    width: '100%',
  },
});