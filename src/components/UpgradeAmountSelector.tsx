import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useAtom } from 'jotai';

import { Colors } from '../types/colors';
import { upgradeAmountAtom } from '../atoms/configurationAtom';

const UpgradeAmountSelector = () => {
  const [upgradeAmount, setUpgradeAmount] = useAtom(upgradeAmountAtom);
  const [selected, setSelected] = useState(upgradeAmount);

  const handleSelection = (amount: string) => {
    setUpgradeAmount(amount);
    setSelected(amount);
  }

  const options = ['1', '5', '10', '100', 'MAX'] as const;
  return (
    <View style={styles.container}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt}
          style={[styles.button, selected === opt && styles.selected]}
          onPress={() => handleSelection(opt)}
        >
          <Text style={styles.buttonText}>
            {opt === 'MAX' ? 'MAX' : `x${opt}`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default UpgradeAmountSelector;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selected: {
    backgroundColor: Colors.buttonBackgroundSelected,
    borderWidth: 2,
  },
});