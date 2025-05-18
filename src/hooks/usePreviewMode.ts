import { useAtomValue } from 'jotai';

import { previewModeAtom } from '../atoms/playerProgressAtom';

/**
 * Hook to check if the app is currently in Preview Mode.
 * Returns true when viewing a friend's build, false for your own.
 */
export function usePreviewMode(): boolean {
  return useAtomValue(previewModeAtom);
} 