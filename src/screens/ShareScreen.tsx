import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

import { useAtomValue, useSetAtom } from 'jotai';
import * as Clipboard from 'expo-clipboard';

import { exportProgress, importProgress } from '../utils/progressShare';
import {
  playerUpgradeProgressAtom,
  playerCardProgressAtom,
  previewModeAtom,
  previewUpgradeProgressAtom,
  previewCardProgressAtom,
} from '../atoms/playerProgressAtom';
import { Colors } from '../types/colors';

export default function ShareScreen() {
  const upgradeProgress = useAtomValue(playerUpgradeProgressAtom);
  const cardProgress = useAtomValue(playerCardProgressAtom);
  const previewMode = useAtomValue(previewModeAtom);
  const setPreviewMode = useSetAtom(previewModeAtom);
  const setPreviewUp = useSetAtom(previewUpgradeProgressAtom);
  const setPreviewCard = useSetAtom(previewCardProgressAtom);

  const [exportCode, setExportCode] = useState('');
  const [importCode, setImportCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      const code = exportProgress(upgradeProgress, cardProgress);
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
      const { upgradeProgress: newUp, cardProgress: newCard } = importProgress(importCode.trim());
      setPreviewUp(newUp as any);
      setPreviewCard(newCard as any);
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
        <Text style={styles.sectionTitle}>Export Progress</Text>
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

        <Text style={styles.sectionTitle}>Import Progress</Text>
        <TextInput
          style={styles.codeBox}
          multiline
          placeholder="Paste code here"
          value={importCode}
          onChangeText={setImportCode}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title="Review Build" onPress={handlePreview} />
      </ScrollView>
    </View>
  );
}

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
    padding: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
}); 