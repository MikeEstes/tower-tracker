import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as Clipboard from 'expo-clipboard';

import { exportProgress, importProgress } from '../utils/progressShare';
import {
  playerUpgradeProgressAtom,
  playerCardProgressAtom,
  playerLabProgressAtom,
  previewModeAtom,
  previewUpgradeProgressAtom,
  previewCardProgressAtom,
  previewLabProgressAtom,
} from '../atoms/playerProgressAtom';
import { Colors } from '../types/colors';
import { Spacing } from '../styles/spacing';
import withBaseScreen from '../components/withBaseScreen';
import { Typography } from '../styles/fonts';

const ShareScreen = () => {
  const upgradeProgress = useAtomValue(playerUpgradeProgressAtom);
  const cardProgress = useAtomValue(playerCardProgressAtom);
  const labProgress = useAtomValue(playerLabProgressAtom);
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);
  const setPreviewUp = useSetAtom(previewUpgradeProgressAtom);
  const setPreviewCard = useSetAtom(previewCardProgressAtom);
  const setPreviewLab = useSetAtom(previewLabProgressAtom);

  const [exportCode, setExportCode] = useState('');
  const [importCode, setImportCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      const code = exportProgress(upgradeProgress, cardProgress, labProgress);
      setExportCode(code);
      setError(null);
      await Clipboard.setStringAsync(code);
      Alert.alert('Copied to clipboard');
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(exportCode);
    Alert.alert('Copied to clipboard');
  };

  const handlePreview = () => {
    try {
      const { upgradeProgress: newUp, cardProgress: newCard, labProgress: newLab } = importProgress(importCode.trim());
      setPreviewUp(newUp as any);
      setPreviewCard(newCard as any);
      setPreviewLab(newLab as any);
      setPreviewMode(true);
      setError(null);
      Alert.alert('Preview mode');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {previewMode && <Button title="Back to My Build" onPress={() => setPreviewMode(false)} />}
        <Text style={Typography.screenHeader}>{'Export Progress'}</Text>
        <Button title="Generate Code" onPress={handleGenerate} />
        {exportCode ? (
          <>
            <TextInput
              style={styles.codeBox}
              multiline
              value={exportCode}
              editable={false}
            />
            <Button title="Copy Code" onPress={handleCopy} />
          </>
        ) : null}

        <Text style={Typography.screenHeader}>{'Import Progress'}</Text>
        <TextInput
          style={styles.codeBox}
          multiline
          placeholder="Paste code here"
          value={importCode}
          onChangeText={setImportCode}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title="Preview Build" onPress={handlePreview} />
      </ScrollView>
    </View>
  );
}

export default withBaseScreen(ShareScreen, {
  getTitle: () => 'Share',
  getBannerColor: () => Colors.cardsBanner,
  moduleType: 'hidden'
});

const styles = StyleSheet.create({
  codeBox: {
    backgroundColor: Colors.moduleBackground,
    borderRadius: 4,
    color: Colors.text,
    marginVertical: 8,
    minHeight: 100,
    padding: 8,
    textAlignVertical: 'top',
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  content: {
    gap: 16,
    padding: Spacing.md,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
}); 