import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView, Pressable } from 'react-native';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import * as ImagePicker from 'expo-image-picker';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../../App';
import { exportProgress, importProgress, uploadProgress, fetchProgressById } from '../utils/progressShare';
import {
  playerUpgradeProgressAtom,
  playerCardProgressAtom,
  playerLabProgressAtom,
  previewModeAtom,
  previewUpgradeProgressAtom,
  previewCardProgressAtom,
  previewLabProgressAtom,
} from '../atoms/playerProgressAtom';
import { Colors } from '../styles/colors';
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
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, 'Share'>>();
  const codeParam = route.params?.code;

  const importProgressByCode = async (codeToUse: string) => {
    setIsLoading(true);
    try {
      const progressString = await fetchProgressById(codeToUse);
      const { upgradeProgress: newUp, cardProgress: newCard, labProgress: newLab } = importProgress(progressString);
      setPreviewUp(newUp as any);
      setPreviewCard(newCard as any);
      setPreviewLab(newLab as any);
      setPreviewMode(true);
      setError(null);
      Alert.alert('Preview mode');
    } catch (e) {
      setError((e as Error).message);
      Alert.alert('Error', (e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (codeParam) {
      importProgressByCode(codeParam);
    }
  }, [codeParam]);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const code = exportProgress(upgradeProgress, cardProgress, labProgress);
      // Upload to Supabase and get a short code
      const id = await uploadProgress(code);
      setShareCode(id);
      // Use expo-linking to generate deep link URL with path parameter
      const url = Linking.createURL(`share/${id}`);
      setQrCodeValue(url);
      setExportCode(id); // Show the code for manual copy
      setError(null);
      await Clipboard.setStringAsync(id);
      Alert.alert('Share code copied to clipboard');
    } catch (e) {
      setError((e as Error).message);
      Alert.alert('Error', (e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportByCode = async () => {
    importProgressByCode(importCode.trim());
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        // Here you would typically use a QR code scanner library to extract the code from the image
        // For now, we'll just show an alert
        Alert.alert('Coming Soon', 'Image QR code scanning will be available in a future update!');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {previewMode && <Button title="Back to My Build" onPress={() => setPreviewMode(false)} />}
        <Text style={Typography.screenHeader}>{'Share Progress'}</Text>
        <Button title={isLoading ? 'Generating...' : 'Generate Share Link'} onPress={handleGenerate} disabled={isLoading} />
        {qrCodeValue && shareCode ? (
          <View style={styles.qrContainer}>
            <QRCode
              value={qrCodeValue}
              size={200}
              backgroundColor={Colors.moduleBackground}
              color={Colors.text}
            />
            <Text style={styles.qrInstructions}>
              {'Scan this QR code or enter the code below to import this build'}
            </Text>
            <Text selectable style={styles.shareCode}>{shareCode}</Text>
          </View>
        ) : null}
        <Text style={Typography.screenHeader}>{'Import Progress'}</Text>
        <View style={styles.importOptions}>
          <TextInput
            style={[styles.codeBox, styles.codeInput]}
            multiline
            placeholder="Enter share code here"
            value={importCode}
            onChangeText={setImportCode}
            editable={!isLoading}
          />
          <Pressable style={styles.imagePickerButton} onPress={handlePickImage} disabled={isLoading}>
            <Ionicons name="image-outline" size={24} color={Colors.text} />
          </Pressable>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title={isLoading ? 'Loading...' : 'Preview Build'} onPress={handleImportByCode} disabled={isLoading} />
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
    marginVertical: Spacing.md,
    maxHeight: '40%',
    minHeight: 100,
    padding: Spacing.md,
    textAlignVertical: 'top',
  },
  codeInput: {
    flex: 1,
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
  imagePickerButton: {
    alignItems: 'center',
    backgroundColor: Colors.moduleBackground,
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    marginLeft: Spacing.sm,
    width: 48,
  },
  importOptions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: Colors.moduleBackground,
    borderRadius: 8,
    marginVertical: Spacing.md,
    padding: Spacing.md,
  },
  qrInstructions: {
    color: Colors.text,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  shareCode: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
}); 