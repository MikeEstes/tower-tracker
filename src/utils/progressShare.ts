import { compressToBase64, decompressFromBase64 } from 'lz-string';

// Full payload with versioning
export interface FullProgressPayload {
  version: number;
  data: {
    upgradeProgress: Record<string, number>;
    cardProgress: Record<string, number>;
    labProgress: Record<string, number>;
  };
}

const VERSION = 1;

// Export both upgrade and card progress to a compressed Base64 string
export function exportProgress(
  upgradeProgress: Record<string, number>,
  cardProgress: Record<string, number>,
  labProgress: Record<string, number>
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
  upgradeProgress: Record<string, number>;
  cardProgress: Record<string, number>;
  labProgress: Record<string, number>;
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