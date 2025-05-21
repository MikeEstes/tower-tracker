import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useAtom, useAtomValue } from 'jotai';

import { Colors } from '../styles/colors';
import { upgradeAmountAtom, currentModuleTypeAtom } from '../atoms/configurationAtom';
import { useModuleActions } from '../hooks/useModuleActions';
import { previewModeAtom } from '../atoms/playerProgressAtom';
import { Spacing } from '../styles/spacing';
import { Typography } from '../styles/fonts';

type FooterButtonProps = {
  onPress: () => void;
  text: string;
}

const FooterButton = ({ onPress, text }: FooterButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={Typography.button}>{text}</Text>
    </TouchableOpacity>
  )
}


const ModuleFooter = () => {
  const options = ['1', '5', '10', '100', 'MAX'] as const;
  const [upgradeAmount, setUpgradeAmount] = useAtom(upgradeAmountAtom);
  const moduleType = useAtomValue(currentModuleTypeAtom);
  const { increment, decrement } = useModuleActions();
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);

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
      {previewMode ? (
        <View style={styles.previewModeContainer}>
          <Text style={styles.previewModeText}>{'Preview Mode'}</Text>
          <FooterButton onPress={() => setPreviewMode(false)} text={'Exit Preview'} />
        </View>
      ) : (
        <>
          <FooterButton onPress={decrement} text={'-'} />
          <FooterButton onPress={toggleUpgradeOption} text={`${upgradeAmount === 'MAX' ? '' : 'x'} ${upgradeAmount}`} />
          <FooterButton onPress={increment} text={'+'} />
        </>
      )}
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
    padding: Spacing.md,
    width: '100%',
  },
  previewModeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    width: '100%',
  },
  previewModeText: {
    color: Colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});