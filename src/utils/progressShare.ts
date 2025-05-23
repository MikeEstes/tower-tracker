import { compressToBase64, decompressFromBase64 } from 'lz-string';
import Constants from 'expo-constants';

import { CardProgress, UpgradeProgress, LabProgress } from '../types/progress';

const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig?.extra ?? {};
console.log(SUPABASE_URL, SUPABASE_ANON_KEY);

// Full payload with versioning
export interface FullProgressPayload {
  version: number;
  data: {
    upgradeProgress: UpgradeProgress;
    cardProgress: CardProgress;
    labProgress: LabProgress;
  };
}

const VERSION = 1;

// Export both upgrade and card progress to a compressed Base64 string
export function exportProgress(
  upgradeProgress: UpgradeProgress,
  cardProgress: CardProgress,
  labProgress: LabProgress
): string {
  const payload: FullProgressPayload = {
    version: VERSION,
    data: {
      upgradeProgress,
      cardProgress,
      labProgress,
    },
  };
  const json = JSON.stringify(payload);
  return compressToBase64(json);
}

// Import and decompress the progress payload
export function importProgress(
  code: string
): {
  upgradeProgress: UpgradeProgress;
  cardProgress: CardProgress;
  labProgress: LabProgress;
} {
  const json = decompressFromBase64(code);
  if (!json) {
    throw new Error('Invalid code');
  }
  const payload = JSON.parse(json) as FullProgressPayload;
  if (payload.version !== VERSION) {
    throw new Error(`Unsupported version: ${payload.version}`);
  }
  return payload.data;
}

// Save progress and return the share code (id) via Supabase REST API
export async function uploadProgress(progress: string): Promise<string> {
  const url = `${SUPABASE_URL}/rest/v1/progress_shares`;
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ progress_data: progress }) });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Upload failed: ${errorBody}`);
  }
  const data = await response.json();
  return data[0].id;
}

// Fetch progress by code via Supabase REST API
export async function fetchProgressById(id: string): Promise<string> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/progress_shares?id=eq.${id}&select=progress_data`,
    {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Fetch failed: ${errorBody}`);
  }
  const data = await response.json();
  if (!data.length) {
    throw new Error('Share code not found');
  }
  return data[0].progress_data;
} 